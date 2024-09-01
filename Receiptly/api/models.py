from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime


class Product(models.Model):
    PRODUCT_TYPE_CHOICES = [
        ('g', 'Good'),
        ('s', 'Service')
    ]


    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    unit = models.CharField(max_length=20, null=True, blank=True)
    cost_per_unit = models.PositiveIntegerField(null=True, blank=True)
    product_type = models.CharField(null=True, blank=True, max_length=1, choices=PRODUCT_TYPE_CHOICES)
    effort = models.FloatField(null=True, blank=True) # in hours


    def __str__(self) -> str:
        return f"User : {self.user} - product name: {self.title}"

class Receipt(models.Model):

    RECEIPT_STATE_CHOICES = [
        ('active', 'Active'),
        ('cancelled', 'Cancelled'),
        ('done', 'Done'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    customer_name = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True) #customer's address
    number = models.CharField(max_length=20, null=True, blank=True) #customer's phone number
    has_paid = models.BooleanField(default=False)
    order_date = models.DateField(default=timezone.now)
    deadline_date = models.DateField(null=True, blank=True)
    products = models.ManyToManyField(Product, through="OrderInfo")
    state = models.CharField(default=None, max_length=20, null=True, blank=True, choices=RECEIPT_STATE_CHOICES)

    # Shows the date prior to deadline after which the receipt owner is notified about the remaining days until deadline date
    deadline_notice = models.DateField(default=None, blank=True, null=True)

    def __str__(self) -> str:
        return f"User : {self.user} - Customer : {self.customer_name}"
    
class OrderInfo(models.Model):
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_count = models.IntegerField(null=True, blank=True)

    def __str__(self) -> str:
        return f"Receipt : {self.receipt.title} - Product : {self.product.title}"
