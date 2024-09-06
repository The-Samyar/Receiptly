import graphene
from graphene_django import DjangoObjectType
from . import models
from django.contrib.auth.models import User
from django.core.serializers import serialize, deserialize
from .redis_script import Rcache


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
        if not Rcache.exists("receipts"):
            receipts = models.Receipt.objects.all()
            Rcache.set("receipts", serialize("json", receipts))

        receipts = deserialize("json", Rcache.get("receipts"))

        if receipt_id:
            try:
                for item in receipts:
                    if str(item.object.id) == str(receipt_id):
                        return [item.object]

                raise models.Receipt.DoesNotExist

            except models.Receipt.DoesNotExist:
                return Exception(f"Receipt with id {receipt_id} does not exist")
        else:
            return [item.object for item in receipts]

    products = graphene.List(ProductType, product_id=graphene.String())

    def resolve_products(root, info, product_id=None):
        if not Rcache.exists("products"):
            products = models.Product.objects.all()
            Rcache.set("products", serialize("json", products))

        products = deserialize("json", Rcache.get("products"))

        if product_id:
            try:
                for item in products:
                    if str(item.object.id) == str(product_id):
                        return [item.object]

                raise models.Product.DoesNotExist

            except models.Product.DoesNotExist:
                return Exception(f"Product with id {product_id} does not exist")
        else:
            return [item.object for item in products]


# class Mutation(graphene.Mutation):
#     pass


schema = graphene.Schema(
    query=Query,
    # mutation=Mutation,
)
