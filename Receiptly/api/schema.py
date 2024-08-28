import graphene
from graphene_django import DjangoObjectType
from . import models
from django.contrib.auth.models import User

class ReceiptType(DjangoObjectType):
    class Meta:
        model = models.Receipt
        fields = (
            'user',
            'title',
            'customer_name',
            'deadline_date',
            'address',
            'products',
            'orderinfo_set'
        )

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'username',
        )

class ProductType(DjangoObjectType):
    class Meta:
        model = models.Product
        fields = "__all__"

class OrderInfoType(DjangoObjectType):
    class Meta:
        model = models.OrderInfo
        fields = "__all__"

class Query(graphene.ObjectType):
    receipts = graphene.List(ReceiptType)

    orders = graphene.List(OrderInfoType)

    def resolve_receipts(root, info):
        return models.Receipt.objects.all()

schema = graphene.Schema(query=Query)