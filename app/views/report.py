from app.pydantic_models import ReportRequest, ReportResponse
from app.pydantic_models import ResponseMessage
# from flask_jwt_extended import create_access_token, jwt_required, current_user
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

    key1 = str(all_embeddings["A"]).strip("[]")

    request_data = {"key1": key1, "key2": "sociologyclass"}
    # ml_request = {"key1": key1, "key2": "sociologycit"}

    result = requests.post(URL_RESULT, json=request_data)

    best_n = numpy.argsort(-numpy.array(result.json()), axis=1)[:, :5]

    logger.debug("best_n", best_n)

    df = pandas.read_csv(f"app/csv_files/{body.study_field}_classes.csv")

    logger.debug(df["num"][best_n[0]])
    logger.debug(df["title"][df["num"][best_n[0]]])

    return ReportResponse(success=True, description='Report successful.', all_embeddings=all_embeddings).json()


# [
#   {
#     name: "Short summary",
#     subTitle: "Coming soon",
#     info: [
#       {
#         name: "",
#         value: 0,
#         text: "",
#       },
#     ],
#   },
#   {
#     name: "Related literature",
#     subTitle: "Coming soon",
#     info: [
#       {
#         name: "",
#         value: 0,
#         text: "",
#       },
#     ],
#   },
#   {
#     name: "Recommended journals",
#     subTitle: "",
#     info: [
#       {
#         name: "Journal of XXX",
#         value: 96,
#         text: "% fit",
#       },
#       {
#         name: "Journal of YYY",
#         value: 90,
#         text: "% fit",
#       },
#       {
#         name: "Economics Journal of XXX",
#         value: 87,
#         text: "% fit",
#       },
#       {
#         name: "American Review of XXX",
#         value: 82,
#         text: "% fit",
#       },
#       {
#         name: "International Journal of XXX",
#         value: 78,
#         text: "% fit",
#       },
#     ],
#   },
#   {
#     name: "Citations forecast",
#     subTitle:
#       "Relative to other papers in the same field published in the same year",
#     info: [
#       {
#         name: "Top 5% of citations",
#         value: 50,
#         text: "% probability",
#       },
#       {
#         name: "Top 10% - Top 5% of citations",
#         value: 30,
#         text: "% probability",
#       },
#       {
#         name: "Top 25% - Top 10% of citations",
#         value: 11,
#         text: "% probability",
#       },
#       {
#         name: "Top 50% - Top 25% of citations",
#         value: 8,
#         text: "% probability",
#       },
#       {
#         name: "Bottom 50% of citations",
#         value: 1,
#         text: "% probability",
#       },
#     ],
#   },
#   {
#     name: "Index of paper novelty",
#     subTitle: "Coming soon",
#     info: [
#       {
#         name: "",
#         value: 0,
#         text: "",
#       },
#     ],
#   },
# ];
