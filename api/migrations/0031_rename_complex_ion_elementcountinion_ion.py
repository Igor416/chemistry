# Generated by Django 4.1.1 on 2023-09-29 12:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_rename_valency_elementcountincovalentsubstance_oxidation_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='elementcountinion',
            old_name='complex_ion',
            new_name='ion',
        ),
    ]
