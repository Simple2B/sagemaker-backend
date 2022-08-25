from app.pydantic_models import ReportRequest, ReportResponse
from app.pydantic_models import ResponseMessage
from flask_openapi3.models import Tag
from app.views.blueprint import BlueprintApi
from app.logger import logger
from typing import Dict, List
import requests
import numpy
import pandas


URL_ARRAY = "https://model-apis.semanticscholar.org/specter/v1/invoke"
URL_RESULT = "https://9aki29rw4b.execute-api.us-east-1.amazonaws.com/test/paper-predictions"
MAX_BATCH_SIZE = 16


def chunks(lst, chunk_size=MAX_BATCH_SIZE):
    """Splits a longer list to respect batch size"""
    for i in range(0, len(lst), chunk_size):
        yield lst[i: i + chunk_size]


def embed(papers):
    embeddings_by_paper_id: Dict[str, List[float]] = {}

    for chunk in chunks(papers):
        # Allow Python requests to convert the data above to JSON
        response = requests.post(URL_ARRAY, json=chunk)

        if response.status_code != 200:
            raise RuntimeError("Sorry, something went wrong, please try later!")

        for paper in response.json()["preds"]:
            embeddings_by_paper_id[paper["paper_id"]] = paper["embedding"]

    return embeddings_by_paper_id


# Set up Bluerints
SECURITY = [{"jwt": []}]
TAG = Tag(name="Report", description="Peer viewer")
api_report = BlueprintApi("/report", __name__, abp_tags=[TAG], abp_security=SECURITY)


@api_report.post('/report')
@logger.catch
def report_post(body: ReportRequest):
    logger.debug(body)

    SAMPLE_PAPERS = [
        {
            "paper_id": "A",
            "title": f"{body.title}",
            "abstract": f"{body.abstract}",
        }
    ]

    try:
        all_embeddings = embed(SAMPLE_PAPERS)
    except Exception:
        return ResponseMessage(success=False, description='Something went wrong').json()

    df = pandas.read_csv(f"app/csv_files/{body.study_field}_classes.csv")

    key1 = str(all_embeddings["A"]).strip("[]")

    request_data = {"key1": key1, "key2": f"{body.study_field}class"}
    request_data_cit = {"key1": key1, "key2": f"{body.study_field}cit"}

    if body.study_field == "sociology":
        request_data_cit["key2"] = "sociology_cit"

    result = requests.post(URL_RESULT, json=request_data)
    result_cit = requests.post(URL_RESULT, json=request_data_cit)

    logger.debug(f"{len(result.json()[0])}, {len(df)}")

    best_n = numpy.argsort(-numpy.array(result.json()), axis=1)[:, :5]
    best_n_cit = result_cit.json()

    logger.debug(f"best_n {best_n}")
    logger.debug(df["title"][df["num"][best_n[0]]].to_list())
    logger.debug(best_n_cit)

    response_cit = [round(i*100) for i in best_n_cit[0]]
    response_cit.reverse()

    response_list = [df["title"][df["num"][best_n[0]]].to_list(), response_cit]

    return ReportResponse(success=True, description='Report successful.', all_embeddings=response_list).json()
