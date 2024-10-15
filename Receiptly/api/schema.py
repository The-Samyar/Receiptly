import strawberry
from .graphql_config import query_schema, mutation_schema
from strawberry_django.optimizer import DjangoOptimizerExtension

schema = strawberry.Schema(
    query=query_schema.Query,
    mutation=mutation_schema.Mutation,
    extensions=[
        DjangoOptimizerExtension,
    ],
)
