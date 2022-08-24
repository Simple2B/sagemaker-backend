from pydantic import BaseModel, Field
from app.pydantic_models import ResponseMessage


class ReportModel(BaseModel):
    title: str = Field("test_title", description='title')
    abstract: str = Field("test_abstract", description='abstract')


class ReportRequest(ReportModel):
    name: str = Field("test_name", description='name')
    email: str = Field("test_email@mail.com", description='email')
    study_field: str = Field("test_field_of_study", description='field_of_study')


class ReportResponse(ResponseMessage):
    all_embeddings: dict = Field(
        {'A': [4.089589595794678, ], 'B': [-0.15814849734306335, ]},
        description='all_embeddings'
        )
