# Generated by Django 4.1.1 on 2023-09-30 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0040_alter_element_options_ionicsubstance_soluble_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ionicsubstance',
            name='soluble',
            field=models.BooleanField(verbose_name='Soluble'),
        ),
    ]
