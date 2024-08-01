from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import serializers, models

@api_view(['GET'])
def index(request):
    return Response({'message': 'TEST'})