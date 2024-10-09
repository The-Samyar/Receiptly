import strawberry
import strawberry_django as sd
from strawberry_django.optimizer import DjangoOptimizerExtension

from graphql_config.types import Product


@strawberry.type
class Query:
    products: list[Product] = sd.field()


schema = strawberry.Schema(
    query=Query,
    extensions=[
        DjangoOptimizerExtension,
    ],
)
