from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import serializers, models
from django.contrib.auth.models import User

user = User.objects.get(username = 'akbar')
@api_view(['GET'])
def index(request):
    serialized_data = serializers.ReceiptSerializer(user.receipt_set.all(),many = True)
    return Response(serialized_data.data)

@api_view(['GET'])
def receipts(request):
    serialized_data = serializers.ReceiptSerializer(user.receipt_set.all(),many = True)
    return Response(serialized_data.data)

@api_view(['GET'])
def products(request):
    serialized_data = serializers.ProductSerializer(models.Product.objects.all(), many=True)
    return Response(serialized_data.data)