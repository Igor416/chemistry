# Generated by Django 4.1.1 on 2023-06-17 18:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_covalentsubstance_color_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='covalentsubstance',
            name='is_organic',
            field=models.BooleanField(verbose_name='Is Organic'),
        ),
        migrations.AlterField(
            model_name='covalentsubstance',
            name='klass',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.klass', verbose_name='Class'),
        ),
        migrations.AlterField(
            model_name='ionicsubstance',
            name='is_organic',
            field=models.BooleanField(verbose_name='Is Organic'),
        ),
        migrations.AlterField(
            model_name='ionicsubstance',
            name='klass',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.klass', verbose_name='Class'),
        ),
    ]
