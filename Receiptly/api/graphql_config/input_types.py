import strawberry_django as sd
from .. import models
import strawberry
from typing import List, Optional


@sd.input(model=models.Product, exclude=["id", "user"])
class NewProductInputType:
    pass


@sd.input(model=models.Product, exclude=["user"], partial=True)
class EditProductInputType:
    id: strawberry.ID


@sd.input(model=models.Product, fields=["id"])
class DeleteProductType:
    id: strawberry.ID


@strawberry.input
class OrderProductsInfoInputType:
    id: Optional[strawberry.ID]
    count: Optional[int]


@sd.input(model=models.Receipt, exclude=["id", "user"])
class NewReceiptInputType:
    products: List[OrderProductsInfoInputType]
