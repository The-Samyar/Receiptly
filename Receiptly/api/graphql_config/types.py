import strawberry_django
from strawberry import auto
import strawberry

from .. import models


@strawberry_django.type(model=models.Product)
class Product:
    user: auto
    title: auto
    unit: auto
    cost_per_unit: auto
    product_type: auto
    effort: auto
