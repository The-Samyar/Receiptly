import strawberry
import strawberry_django as sd
from strawberry_django.optimizer import DjangoOptimizerExtension

from .graphql_config.types import ProductType, UserType, ReceiptType


@strawberry.type
class Query:
    users: list[UserType] = sd.field()
    products: list[ProductType] = sd.field()
    receipts: list[ReceiptType] = sd.field()


schema = strawberry.Schema(
    query=Query,
    extensions=[
        DjangoOptimizerExtension,
    ],
)
