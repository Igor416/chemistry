# Generated by Django 4.1.1 on 2023-09-29 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0033_alter_elementcountincovalentsubstance_oxidation_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='elementcountincovalentsubstance',
            name='count',
            field=models.CharField(default='1', max_length=1, verbose_name='Count'),
        ),
        migrations.AlterField(
            model_name='elementcountinion',
            name='count',
            field=models.CharField(default='1', max_length=1, verbose_name='Count'),
        ),
    ]
