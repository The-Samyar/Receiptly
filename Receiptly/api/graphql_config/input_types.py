import strawberry_django as sd
from .. import models
import strawberry
from typing import List


@sd.input(model=models.Product, exclude=["id", "user"])
class NewProductInputType:
    pass


@sd.input(model=models.Product, exclude=["user"], partial=True)
class EditProductInputType:
    id: strawberry.ID


@sd.input(model=models.Product, fields=["id"])
class DeleteProductType:
    pass


@strawberry.input
class OrderProductsInfoInputType:
    id: strawberry.ID
    count: int


@sd.input(model=models.Receipt, exclude=["id", "user"])
class NewReceiptInputType:
    products: List[OrderProductsInfoInputType]
