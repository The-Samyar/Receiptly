import strawberry
from .graphql_config import query_schema
from strawberry_django.optimizer import DjangoOptimizerExtension

schema = strawberry.Schema(
    query=query_schema.Query,
    extensions=[
        DjangoOptimizerExtension,
    ],
)
