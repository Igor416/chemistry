# Generated by Django 4.1.1 on 2023-10-01 10:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0053_alter_ion_options_rename_group_int_element_group_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ion',
            name='oxidation',
        ),
    ]
