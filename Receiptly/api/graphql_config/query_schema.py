import strawberry
import strawberry_django as sd
from .output_types import ProductType, UserType, ReceiptType
from .. import models
from django.contrib.auth.models import User


@strawberry.type
class Query:
    # --------------- User queries ---------------
    # Single user based on ID
    @strawberry.field
    def user(self, user_id: int = None) -> UserType:
        return User.objects.get(id=user_id)

    # A list of all users
    users: list[UserType] = sd.field()

    # --------------- Products queries ---------------
    # Single product based on ID
    @strawberry.field
    def product(self, product_id: int = None) -> ProductType:
        return models.Product.objects.get(id=product_id)

    # A list of all products
    products: list[ProductType] = sd.field()

    # --------------- Receipts queries ---------------
    # Single receipt based on ID
    @strawberry.field
    def receipt(self, receipt_id: int = None) -> ReceiptType:
        return models.Receipt.objects.get(id=receipt_id)

    # A list of all receipts
    receipts: list[ReceiptType] = sd.field()
