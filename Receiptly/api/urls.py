from django.urls import path
from . import views
from strawberry.django.views import AsyncGraphQLView, GraphQLView
from django.views.decorators.csrf import csrf_exempt
from .schema import schema

urlpatterns = [
    path("index/", views.index),
    path("receipts/", views.receipts),
    # path('receipts/edit/<int:receipt_id>/', views.receipts),
    # path('receipts/delete/<int:receipt_id>/', views.receipts),
    path("products/", views.products),
    # path('products/edit/<int:product_id>/', views.products),
    # path('products/delete/<int:product_id>/', views.products),
    # path('history/', views.products),
    path("graphiq", csrf_exempt(GraphQLView.as_view(schema=schema))),
]
