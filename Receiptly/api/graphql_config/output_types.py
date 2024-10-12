import strawberry_django as sd
from strawberry import auto
from django.contrib.auth.models import User
from .. import models
import strawberry


@sd.type(model=User)
class UserType:
    first_name: auto
    last_name: auto
    username: auto


@sd.type(model=models.Product)
class ProductType:
    user: "UserType"
    title: auto
    unit: auto
    cost_per_unit: auto
    product_type: auto
    effort: auto


@strawberry.type
class ReceiptProductInfoType:
    title: str
    cost_per_unit: int
    effort: float
    count: int


@sd.type(model=models.Receipt)
class ReceiptType:
    user: "UserType"
    title: auto
    customer_name: auto
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
                    title=order.product.title,
                    cost_per_unit=order.product.cost_per_unit,
                    effort=order.product.effort,
                    count=order.product_count,
                )
            )
        return products_list
