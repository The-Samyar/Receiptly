import strawberry
import strawberry_django as sd
from .input_types import (
    NewProductInputType,
    EditProductInputType,
    DeleteProductType,
    NewReceiptInputType,
    EditReceiptInputType,
    DeleteReceiptInputType,
)
from .output_types import ProductType, ReceiptType
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
        for field, value in edited_product_dict.items():
            if value != "id" and value is not strawberry.UNSET:
                setattr(product, field, value)
        product.save()

        return cast(ProductType, product)

    # Deletes an existing product
    @sd.mutation
    def delete_product(self, deleted_product: DeleteProductType) -> bool:
        try:
            models.Product.objects.get(id=deleted_product.id).delete()
            return True
        except models.Product.DoesNotExist:
            return False

    # --------------- Receipt mutations ---------------
    # Saves new receipt
    @sd.mutation
    def new_receipt(self, receipt_input: NewReceiptInputType) -> ReceiptType:
        receipt_input = vars(receipt_input)
        products = receipt_input.pop("products")
        receipt = models.Receipt.objects.create(user=user, **receipt_input)
        for product in products:
            receipt.products.add(
                user.product_set.get(id=product.id),
                through_defaults={
                    "product_count": product.count,
                },
            )
        return cast(ReceiptType, receipt)

    # Edits an existing receipt
    @sd.mutation
    def edit_receipt(edited_receipt: EditReceiptInputType) -> ReceiptType:
        receipt = models.Receipt.objects.get(id=edited_receipt.id)
        edited_receipt_dict = vars(edited_receipt)
        if edited_receipt_dict["products"] is not strawberry.UNSET:
            products = edited_receipt_dict.pop("products")
            for product in products:
                order, created = receipt.orderinfo_set.get_or_create(
                    receipt=receipt,
                    product=user.product_set.get(id=product.id),
                )
                if product.count == 0:
                    order.delete()
                else:
                    order.product_count = product.count
                    order.save()
        for field, value in edited_receipt_dict.items():

            if value != "id" and value is not strawberry.UNSET:
                setattr(receipt, field, value)

        receipt.save()

        return cast(ReceiptType, receipt)

    # Deletes an existing receipt
    @sd.mutation
    def delete_receipt(deleted_receipt: DeleteReceiptInputType) -> bool:
        try:
            models.Receipt.objects.get(id=deleted_receipt.id).delete()
            return True
        except models.Receipt.DoesNotExist:
            return False
