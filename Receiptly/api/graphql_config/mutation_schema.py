import strawberry
import strawberry_django as sd
from .input_types import NewProductInputType, EditProductInputType, DeleteProductType
from .output_types import ProductType
from .. import models
from django.contrib.auth.models import User
from typing import cast


# -----------------------------------------------------------------------------
# TODO Check if product belongs to the authenticated user
user = User.objects.get(username="akbar")
# -----------------------------------------------------------------------------


@strawberry.type
class Mutation:
    # --------------- Product mutations ---------------
    # Saves new product
    @sd.mutation
    def new_product(self, product: NewProductInputType) -> ProductType:
        product = models.Product.objects.create(user=user, **vars(product))
        return cast(ProductType, product)

    # Edits existing product
    @sd.mutation
    def edit_product(self, edited_product: EditProductInputType) -> ProductType:

        product = models.Product.objects.get(id=edited_product.id)
        edited_product_dict = vars(edited_product)
        for key, value in edited_product_dict.items():
            if value != "id" and value is not strawberry.UNSET:
                setattr(product, key, value)
        product.save()

        return cast(ProductType, product)

    # Deletes an existing product
    @sd.mutation
    def delete_product(self, deleted_product: DeleteProductType) -> ProductType:
        product = models.Product.objects.get(id=deleted_product.id)
        product.delete()
        return product
