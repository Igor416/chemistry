# Generated by Django 4.1.1 on 2023-09-30 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0039_remove_ion_hydroxogroups'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='element',
            options={'ordering': ('atomic_number',), 'verbose_name': 'element', 'verbose_name_plural': 'elements'},
        ),
        migrations.AddField(
            model_name='ionicsubstance',
            name='soluble',
            field=models.BooleanField(default=False, verbose_name='Soluble'),
        ),
        migrations.AlterField(
            model_name='ion',
            name='color',
            field=models.CharField(default='transparent', max_length=16, verbose_name='Color'),
        ),
    ]
