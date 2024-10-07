# Generated by Django 5.1 on 2024-09-25 18:17

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_product_unit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='receipt',
            name='order_date',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='receipt',
            name='products',
            field=models.ManyToManyField(blank=True, null=True, through='api.OrderInfo', to='api.product'),
        ),
    ]