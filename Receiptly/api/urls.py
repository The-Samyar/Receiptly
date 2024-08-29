from django.urls import path
from . import views, apps
from graphene_django.views import GraphQLView



urlpatterns = [
    path('index/', views.index),

    # path('receipts/', views.receipts),
    # # path('receipts/edit/<int:receipt_id>/', views.receipts),
    # # path('receipts/delete/<int:receipt_id>/', views.receipts),

    # path('products/', views.products),
    # # path('products/edit/<int:product_id>/', views.products),
    # # path('products/delete/<int:product_id>/', views.products),

    # # path('history/', views.products),

    # path('graphiq', GraphQLView.as_view(graphiql=True))
]