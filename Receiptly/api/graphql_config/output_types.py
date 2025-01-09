import strawberry_django as sd
from strawberry import auto
from django.contrib.auth.models import User
from .. import models
import strawberry


@sd.type(model=User)
class MyUserType:
    id: auto
    first_name: auto
    last_name: auto
    username: auto


@sd.type(model=models.Product)
class ProductType:
    id: auto
    user: "MyUserType"
    title: auto
    unit: auto
    cost_per_unit: auto
    product_type: auto
    effort: auto


@strawberry.type
class ReceiptProductInfoType:
    order_info_id: strawberry.ID
    receipt_id: strawberry.ID
    product_id: strawberry.ID
    title: str
    cost_per_unit: int
    effort: float
    count: int


@sd.type(model=models.Receipt)
class ReceiptType:
    id: auto
    user: "MyUserType"
    title: auto
    customer_name: auto
    customer_address: auto
    customer_number: auto
    has_paid: auto
    order_date: auto
    deadline_date: auto
    deadline_notice: auto
    state: auto

    # TODO: Consider redoing it using Strawberry's m2m support using typing.List
    @strawberry.field
    def products(self) -> list[ReceiptProductInfoType]:
        products_list = []
        for order in self.orderinfo_set.all():
            products_list.append(
                ReceiptProductInfoType(
                    order_info_id=order.id,
                    receipt_id=order.receipt.id,
                    product_id=order.product.id,
                    title=order.product.title,
                    cost_per_unit=order.product.cost_per_unit,
                    effort=order.product.effort,
                    count=order.product_count,
                )
            )
        return products_list


@strawberry.type
class ResponseType:
    success: bool
    message: str | None
