import strawberry
from .output_types import ProductType, UserType, ReceiptType
from .. import models
from django.contrib.auth.models import User
from typing import List


@strawberry.type
class Query:
    # <<<<<<<<<<< User queries >>>>>>>>>>>
    # Single user based on ID
    @strawberry.field
    def user(self, user_id: int = None) -> UserType:
        return User.objects.get(id=user_id)

    # A list of all users
    @strawberry.field
    def users(self) -> List[UserType]:
        return User.objects.all()

    # <<<<<<<<<<< Products queries >>>>>>>>>>>
    # Single product based on ID
    @strawberry.field
    def product(self, product_id: int = None) -> ProductType:
        return models.Product.objects.get(id=product_id)

    # A list of all products
    @strawberry.field
    def products(self) -> List[ProductType]:
        return models.Product.objects.all()

    # <<<<<<<<<<< Receipts queries >>>>>>>>>>>
    # Single receipt based on ID
    @strawberry.field
    def receipt(self, receipt_id: int = None) -> ReceiptType:
        return models.Receipt.objects.get(id=receipt_id)

    # A list of all receipts
    @strawberry.field
    def receipts(self) -> List[ReceiptType]:
        return models.Receipt.objects.all()
