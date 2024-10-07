from django import forms
from . import models


class ProductForm(forms.ModelForm):
    class Meta:
        model = models.Product
        fields = (
            "cost_per_unit",
            "effort",
            "product_type",
            "title",
            "unit",
        )


class ReceiptProductForm(forms.Form):
    id = forms.IntegerField()
    count = forms.IntegerField()


class ReceiptForm(forms.ModelForm):
    class Meta:
        model = models.Receipt
        exclude = ("user",)
