import strawberry_django as sd
from strawberry import auto
from django.contrib.auth.models import User
import strawberry
from .. import models


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
