from .graphql_config import query_schema, mutation_schema
from strawberry_django.optimizer import DjangoOptimizerExtension
from gqlauth.core.middlewares import JwtSchema

schema = JwtSchema(
    query=query_schema.Query,
    mutation=mutation_schema.Mutation,
    extensions=[
        DjangoOptimizerExtension,
    ],
)
