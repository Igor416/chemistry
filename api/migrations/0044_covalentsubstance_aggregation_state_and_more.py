# Generated by Django 4.1.1 on 2023-09-30 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0043_remove_ion_name1'),
    ]

    operations = [
        migrations.AddField(
            model_name='covalentsubstance',
            name='aggregation_state',
            field=models.CharField(choices=[('gaseous', 'gaseous'), ('liquid', 'liquid'), ('solid', 'solid')], default='solid', max_length=7, verbose_name='Aggregation State'),
        ),
        migrations.AddField(
            model_name='ionicsubstance',
            name='aggregation_state',
            field=models.CharField(choices=[('gaseous', 'gaseous'), ('liquid', 'liquid'), ('solid', 'solid')], default='solid', max_length=7, verbose_name='Aggregation State'),
        ),
    ]
