import strawberry_django as sd
from strawberry import auto
from django.contrib.auth.models import User
from .. import models
from typing import List


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
