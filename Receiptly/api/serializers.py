from rest_framework import serializers
from . import models


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"


# class ProductModalSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Product
#         fields = (
#             'id',
#             'title',
#             'cost_per_unit',
#             'labor'
#         )

# class ProductMinimisedSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Product
#         fields = (
#             'title',
#             'cost_per_unit',
#             'labor',
#         )


class ProductCountSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source="product.title", read_only=True)
    cost_per_unit = serializers.IntegerField(
        source="product.cost_per_unit", read_only=True
    )
    effort = serializers.FloatField(
        source="product.effort", read_only=True
    )  # effort per each one. It is not dependant on the count field
    count = serializers.IntegerField(source="product_count", read_only=True)

    class Meta:
        model = models.OrderInfo
        fields = (
            "id",
            "title",
            "count",
            "effort",
            "cost_per_unit",
        )


class ReceiptSerializer(serializers.ModelSerializer):
    products = ProductCountSerializer(source="orderinfo_set", read_only=True, many=True)

    class Meta:
        model = models.Receipt
        fields = (
            "id",
            "user",
            "title",
            "customer_name",
            "address",
            "number",
            "has_paid",
            "order_date",
            "deadline_date",
            "products",
        )
