import graphene
from graphene_django import DjangoObjectType, DjangoListField
from graphene_django.forms.mutation import DjangoModelFormMutation, DjangoFormMutation

from . import models, forms
from django.contrib.auth.models import User
from django.core.serializers import serialize, deserialize
from .redis_script import Rcache

user = User.objects.get(username="akbar")


# TYPES


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


class ReceiptType(DjangoObjectType):
    class Meta:
        model = models.Receipt
        exclude = ("products",)

    products = graphene.List(OrderInfoType)

    # def resolve_products(self, info):
    #     return


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


# <---------- MUTATIONS ---------->
# Product Mutations
class AddProductMutation(DjangoModelFormMutation):
    product = graphene.Field(ProductType)

    class Meta:
        form_class = forms.ProductForm

    @classmethod
    def mutate(cls, root, info, input):
        form = forms.ProductForm(input)
        if form.is_valid():
            product = form.save(commit=False)

            # Sets products user. Later on when authentication is handled, this should be automatically populated by the user who's logged in
            product.user = user

            product.save()
        return AddProductMutation(product=product)


class UpdateProductMutation(DjangoModelFormMutation):

    class Meta:
        form_class = forms.ProductForm

    product = graphene.Field(ProductType)

    @classmethod
    def mutate(cls, root, info, input):
        product = models.Product.objects.get(id=input["id"])
        form = forms.ProductForm(input)
        if form.is_valid():
            for key in form.cleaned_data:
                value = form.cleaned_data[key]
                if (value is not None) and (value != ""):
                    setattr(product, key, value)
        product.save()
        return UpdateProductMutation(product=product)


class DeleteProductMutation(graphene.Mutation):

    class Arguments:
        id = graphene.ID(required=True)

    deleted = graphene.Boolean()
    product = graphene.Field(ProductType)

    def mutate(root, info, id):
        product = models.Product.objects.get(id=id)
        product.delete()

        return DeleteProductMutation(product=product, deleted=True)


# Receipt mutations


class AddReceiptMutation(DjangoModelFormMutation):
    class Meta:
        form_class = forms.ReceiptForm

    receipt = graphene.Field(ReceiptType)


# _________________________________________________________________

#  class ReceiptProductInput(graphene.InputObjectType):
#     id = graphene.ID(required=True)
#     count = graphene.Int(required=True)


# class AddReceiptMutation(graphene.Mutation):

#     class Arguments:
#         products_add = graphene.List(ReceiptProductInput)
#         # title = graphene.String()
#         # customer_name = graphene.String()
#         # address = graphene.String()
#         # number = graphene.Int()
#         # has_paid = graphene.Boolean()
#         # order_date = graphene.Date()
#         # deadline_date = graphene.Date()
#         # state = graphene.String()
#         # deadline_notice = graphene.Date()

#     receipt = graphene.Field(ReceiptType)

#     @classmethod
#     def mutate(cls, root, info, products_add):
#         print(input)
#         # submitted_products = input
#         # form = forms.ReceiptForm(input)
#         # products = forms.ReceiptProductForm(input)

#         return AddReceiptMutation()


class Mutation(graphene.ObjectType):
    add_product = AddProductMutation.Field()
    update_product = UpdateProductMutation.Field()
    delete_product = DeleteProductMutation.Field()

    add_receipt = AddReceiptMutation.Field()


schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
)
