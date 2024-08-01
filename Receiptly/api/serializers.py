from rest_framework import serializers
from . import models



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = '__all__'

class ProductModalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = (
            'id',
            'title',
            'cost_per_unit',
            'labor'
        )

class ProductMinimisedSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = (
            'title',
            'cost_per_unit',
            'labor',
        )

class ProductCountSerializer(serializers.ModelSerializer):
    # product = ProductMinimisedSerializer()
    id = serializers.CharField(source="product.id", read_only=True)
    title = serializers.CharField(source="product.title", read_only=True)
    cost_per_unit = serializers.IntegerField(source="product.cost_per_unit", read_only=True)
    labor = serializers.CharField(source="product.labor", read_only=True)
    class Meta:
        model = models.OrderInfo
        fields = (
            'id',
            'product_count',
            'title',
            'cost_per_unit',
            'labor',

        )

class ReceiptSerializer(serializers.ModelSerializer):
    orderinfo_set = ProductCountSerializer(read_only=True, many=True)

    class Meta:
        model = models.Receipt
        fields = (
            'id',
            'user',
            'title',
            'customer_name',
            'address',
            'number',
            'has_paid',
            'order_date',
            'deadline_date',
            'orderinfo_set',
        )