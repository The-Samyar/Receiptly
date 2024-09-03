import graphene
from graphene_django import DjangoObjectType, DjangoListField
from . import models
from django.contrib.auth.models import User
from pprint import pprint
from django.core.serializers import serialize, deserialize
from .redis_script import Rcache
import json


class ReceiptType(DjangoObjectType):
    class Meta:
        model = models.Receipt
        exclude = ("products",)


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "username",
        )


class ProductType(DjangoObjectType):
    class Meta:
        model = models.Product
        fields = "__all__"


class OrderInfoType(DjangoObjectType):
    class Meta:
        model = models.OrderInfo
        fields = ("product_count",)

    id = graphene.String()

    def resolve_id(self, info):
        return self.product.id

    title = graphene.String()

    def resolve_title(self, info):
        return self.product.title

    effort = graphene.Float()

    def resolve_effort(self, info):
        return self.product.effort

    cost_per_unit = graphene.Int()

    def resolve_cost_per_unit(self, info):
        return self.product.cost_per_unit


class Query(graphene.ObjectType):
    receipts = graphene.List(ReceiptType, receipt_id=graphene.String())

    def resolve_receipts(root, info, receipt_id=None):
        if receipt_id:
            try:
                return [models.Receipt.objects.get(id=receipt_id)]
            except models.Receipt.DoesNotExist:
                return Exception(f"Receipt with id {receipt_id} does not exist")
        else:
            return models.Receipt.objects.all()

    products = graphene.List(ProductType, product_id=graphene.String())

    # REFACTOR
    def resolve_products(root, info, product_id=None):
        if product_id:
            try:
                if Rcache.exists("products"):
                    products = deserialize("json", Rcache.get("products"))
                    br = True
                    for item in products:
                        if str(item.object.id) == str(product_id):
                            product = [item.object]
                            print("Sent from redis")
                            br = False
                            break
                    if br == True:
                        raise models.Product.DoesNotExist
                else:
                    products = models.Product.objects.all()
                    Rcache.set("products", serialize("json", products))
                    product = [products.get(pk=product_id)]
                    print("Sent from database")

                return product

            except models.Product.DoesNotExist:
                return Exception(f"Product with id {product_id} does not exist")
        else:
            if Rcache.exists("products"):
                deserialized = deserialize("json", Rcache.get("products"))
                products = [item.object for item in deserialized]
                print("Sent from redis")
            else:
                products = models.Product.objects.all()
                print("Sent from database")
                Rcache.set("products", serialize("json", products))
            return products


schema = graphene.Schema(query=Query)
