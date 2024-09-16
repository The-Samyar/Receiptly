from django import forms
from . import models


class ProductsForm(forms.ModelForm):
    class Meta:
        model = models.Product
        fields = "__all__"
