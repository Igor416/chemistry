# Generated by Django 4.1.1 on 2023-09-30 08:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0035_ion_name1'),
    ]

    operations = [
        migrations.AddField(
            model_name='ion',
            name='main_element',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='main_element', to='api.element', verbose_name='Main Element'),
        ),
        migrations.AlterField(
            model_name='ion',
            name='elements',
            field=models.ManyToManyField(related_name='elements', through='api.ElementCountInIon', to='api.element', verbose_name='Elements'),
        ),
    ]
