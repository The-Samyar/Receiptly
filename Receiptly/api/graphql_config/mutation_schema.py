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
from .output_types import ReceiptType, ResponseType
from .. import models
from django.contrib.auth.models import User
from typing import cast
from gqlauth.user import arg_mutations as auth_mutations

# -----------------------------------------------------------------------------
# TODO Check if product belongs to the authenticated user
user = User.objects.get(username="akbar")
# -----------------------------------------------------------------------------


@strawberry.type
class Mutation:
    # --------------- Product mutations ---------------
    # Saves new product
    @sd.mutation
    def new_product(self, product: NewProductInputType) -> ResponseType:
        product = models.Product.objects.create(user=user, **vars(product))
        return ResponseType(success=True, message="")

    # Edits existing product
    @sd.mutation
    def edit_product(self, edited_product: EditProductInputType) -> ResponseType:

        product = models.Product.objects.get(id=edited_product.id)
        edited_product_dict = vars(edited_product)
        for field, value in edited_product_dict.items():
            if value != "id" and value is not strawberry.UNSET:
                setattr(product, field, value)
        product.save()

        return ResponseType(success=True, message="")

    # Deletes an existing product
    @sd.mutation
    def delete_product(self, deleted_product: DeleteProductType) -> ResponseType:
        try:
            models.Product.objects.get(id=deleted_product.id).delete()
            return ResponseType(success=True, message="")
        except models.Product.DoesNotExist:
            return ResponseType(success=False, message="product does not exist")

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
            return ResponseType(success=True)

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

    # --------------- Authentication mutations ---------------
    password_change = auth_mutations.PasswordChange.field
    token_auth = auth_mutations.ObtainJSONWebToken.field
    register = auth_mutations.Register.field
    refresh_token = auth_mutations.RefreshToken.field
    # verify_token = auth_mutations.VerifyToken.field
    # update_account = auth_mutations.UpdateAccount.field
    # archive_account = auth_mutations.ArchiveAccount.field
    # delete_account = auth_mutations.DeleteAccount.field
    # swap_emails = auth_mutations.SwapEmails.field
    # verify_account = auth_mutations.VerifyAccount.field
    # resend_activation_email = auth_mutations.ResendActivationEmail.field
    # send_password_reset_email = auth_mutations.SendPasswordResetEmail.field
    # password_reset = auth_mutations.PasswordReset.field
    # password_set = auth_mutations.PasswordSet.field
    # revoke_token = auth_mutations.RevokeToken.field
    # verify_secondary_email = auth_mutations.VerifySecondaryEmail.field
