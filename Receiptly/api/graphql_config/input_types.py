import strawberry_django as sd
from .. import models
import strawberry


@sd.input(model=models.Product, exclude=["id", "user"])
class NewProductInputType:
    pass


@sd.input(model=models.Product, exclude=["user"], partial=True)
class EditProductInputType:
    id: strawberry.ID


@sd.input(model=models.Product, fields=["id"])
class DeleteProductType:
    pass
