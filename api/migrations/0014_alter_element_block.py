# Generated by Django 4.2.2 on 2023-06-26 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_element_block'),
    ]

    operations = [
        migrations.AlterField(
            model_name='element',
            name='block',
            field=models.CharField(choices=[('s', 's'), ('p', 'p'), ('d', 'd'), ('f', 'f')], max_length=1, verbose_name='Block'),
        ),
    ]
