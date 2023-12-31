# Generated by Django 4.1.1 on 2023-09-29 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_alter_ion_elements'),
    ]

    operations = [
        migrations.AlterField(
            model_name='elementcountincovalentsubstance',
            name='oxidation',
            field=models.CharField(max_length=2, verbose_name='Oxidation'),
        ),
        migrations.AlterField(
            model_name='elementcountinion',
            name='oxidation',
            field=models.CharField(max_length=2, verbose_name='Oxidation'),
        ),
        migrations.AlterField(
            model_name='ion',
            name='elements',
            field=models.ManyToManyField(through='api.ElementCountInIon', to='api.element', verbose_name='Elements'),
        ),
    ]
