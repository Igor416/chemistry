# Generated by Django 4.1.1 on 2023-09-30 14:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0038_alter_ion_options_alter_ion_name1'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ion',
            name='hydroxogroups',
        ),
    ]
