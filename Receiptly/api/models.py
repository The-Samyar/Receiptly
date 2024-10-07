from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django_choices_field import TextChoicesField


# Choice classes
class ProductTypeChoices(models.TextChoices):
    GOOD = "g", "Good"
    SERVICE = "s", "Service"


class StatusChoices(models.TextChoices):
    ACTIVE = "active", "Active"
    CANCELLED = "cancelled", "Cancelled"
    DONE = "done", "Done"


# Models
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    unit = models.CharField(max_length=20, null=True, blank=True)
    cost_per_unit = models.PositiveIntegerField(null=True, blank=True)
    product_type = TextChoicesField(
        choices_enum=ProductTypeChoices,
        blank=True,
    )
    effort = models.FloatField(null=True, blank=True)  # in hours

    def __str__(self) -> str:
        return f"User : {self.user} - product name: {self.title}"


class Receipt(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    customer_name = models.CharField(max_length=200, null=True, blank=True)
    customer_address = models.CharField(
        max_length=200,
        null=True,
        blank=True,
    )
    customer_number = models.CharField(
        max_length=20,
        null=True,
        blank=True,
    )
    has_paid = models.BooleanField(default=False)
    order_date = models.DateField(default=timezone.now, null=True, blank=True)
    deadline_date = models.DateField(null=True, blank=True)
    # Shows the date prior to deadline after which the receipt owner is notified about the remaining days until deadline date
    deadline_notice = models.DateField(default=None, blank=True, null=True)
    products = models.ManyToManyField(Product, through="OrderInfo", blank=True)
    state = TextChoicesField(
        choices_enum=StatusChoices,
        blank=True,
    )

    def __str__(self) -> str:
        return f"User : {self.user} - Customer : {self.customer_name}"


class OrderInfo(models.Model):
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_count = models.IntegerField(null=True, blank=True)

    def __str__(self) -> str:
        return f"Receipt : {self.receipt.title} - {self.product_count} X Product : {self.product.title}"
