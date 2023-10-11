# Generated by Django 4.1.1 on 2023-09-30 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0044_covalentsubstance_aggregation_state_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='covalentsubstance',
            name='aggregation_state',
            field=models.CharField(choices=[('gaseous', 'gaseous'), ('liquid', 'liquid'), ('solid', 'solid')], max_length=7, verbose_name='Aggregation State'),
        ),
        migrations.AlterField(
            model_name='ionicsubstance',
            name='aggregation_state',
            field=models.CharField(choices=[('gaseous', 'gaseous'), ('liquid', 'liquid'), ('solid', 'solid')], max_length=7, verbose_name='Aggregation State'),
        ),
    ]