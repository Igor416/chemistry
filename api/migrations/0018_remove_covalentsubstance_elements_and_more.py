# Generated by Django 4.1.1 on 2023-08-06 15:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_klass_article'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='covalentsubstance',
            name='elements',
        ),
        migrations.RemoveField(
            model_name='covalentsubstance',
            name='klass',
        ),
        migrations.RemoveField(
            model_name='elementcountincovalentsubstance',
            name='element',
        ),
        migrations.RemoveField(
            model_name='elementcountincovalentsubstance',
            name='substance',
        ),
        migrations.RemoveField(
            model_name='elementcountinion',
            name='complex_ion',
        ),
        migrations.RemoveField(
            model_name='elementcountinion',
            name='element',
        ),
        migrations.RemoveField(
            model_name='ionicsubstance',
            name='complex_ions',
        ),
        migrations.RemoveField(
            model_name='ionicsubstance',
            name='klass',
        ),
        migrations.RemoveField(
            model_name='ionicsubstance',
            name='simple_ions',
        ),
        migrations.RemoveField(
            model_name='klass',
            name='reacts_with',
        ),
        migrations.RemoveField(
            model_name='klass',
            name='unique_reactions',
        ),
        migrations.RemoveField(
            model_name='reaction',
            name='covalent_products',
        ),
        migrations.RemoveField(
            model_name='reaction',
            name='covalent_reactives',
        ),
        migrations.RemoveField(
            model_name='reaction',
            name='ionic_products',
        ),
        migrations.RemoveField(
            model_name='reaction',
            name='ionic_reactives',
        ),
        migrations.RemoveField(
            model_name='simpleion',
            name='element',
        ),
        migrations.DeleteModel(
            name='ComplexIon',
        ),
        migrations.DeleteModel(
            name='CovalentSubstance',
        ),
        migrations.DeleteModel(
            name='ElementCountInCovalentSubstance',
        ),
        migrations.DeleteModel(
            name='ElementCountInIon',
        ),
        migrations.DeleteModel(
            name='IonicSubstance',
        ),
        migrations.DeleteModel(
            name='Klass',
        ),
        migrations.DeleteModel(
            name='Reaction',
        ),
        migrations.DeleteModel(
            name='SimpleIon',
        ),
    ]