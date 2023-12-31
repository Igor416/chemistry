# Generated by Django 4.1.1 on 2023-09-28 09:20

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_remove_covalentsubstance_elements_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ComplexIon',
            fields=[
                ('name', models.CharField(max_length=16, primary_key=True, serialize=False, verbose_name='Name')),
                ('color', models.CharField(default='Transparent', max_length=16, verbose_name='Color')),
                ('oxidation', models.CharField(max_length=2, verbose_name='Oxidation')),
            ],
            options={
                'verbose_name': 'complex ion',
                'verbose_name_plural': 'complex ions',
            },
        ),
        migrations.CreateModel(
            name='CovalentSubstance',
            fields=[
                ('name', models.CharField(max_length=64, primary_key=True, serialize=False, verbose_name='Name')),
                ('color', models.CharField(default='Transparent', max_length=16, verbose_name='Color')),
                ('smell', models.CharField(default='Without', max_length=16, verbose_name='Smell')),
                ('trivial_names', models.TextField(blank=True, verbose_name='Trivial names')),
                ('properties', models.CharField(choices=[('acidic', 'acidic'), ('basic', 'basic'), ('amphoteric', 'amphoteric'), ('neutral', 'neutral')], max_length=10, verbose_name='Properties')),
                ('article', models.TextField(verbose_name='Article')),
                ('image', models.ImageField(default='', upload_to='substances/', verbose_name='Image')),
            ],
            options={
                'verbose_name': 'covalent substance',
                'verbose_name_plural': 'covalent substances',
            },
        ),
        migrations.CreateModel(
            name='IonicSubstance',
            fields=[
                ('name', models.CharField(max_length=64, primary_key=True, serialize=False, verbose_name='Name')),
                ('color', models.CharField(default='Transparent', max_length=16, verbose_name='Color')),
                ('smell', models.CharField(default='Without', max_length=16, verbose_name='Smell')),
                ('trivial_names', models.TextField(blank=True, verbose_name='Trivial names')),
                ('properties', models.CharField(choices=[('acidic', 'acidic'), ('basic', 'basic'), ('amphoteric', 'amphoteric'), ('neutral', 'neutral')], max_length=10, verbose_name='Properties')),
                ('article', models.TextField(verbose_name='Article')),
                ('image', models.ImageField(default='', upload_to='substances/', verbose_name='Image')),
                ('complex_ions', models.ManyToManyField(blank=True, to='api.complexion', verbose_name='Complex Ions')),
                ('klass', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.klass', verbose_name='Class')),
            ],
            options={
                'verbose_name': 'ionic substance',
                'verbose_name_plural': 'ionic substances',
            },
        ),
        migrations.CreateModel(
            name='SimpleIon',
            fields=[
                ('name', models.CharField(max_length=16, primary_key=True, serialize=False, verbose_name='Name')),
                ('color', models.CharField(default='Transparent', max_length=16, verbose_name='Color')),
                ('oxidation', models.CharField(max_length=2, verbose_name='Oxidation')),
                ('element', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.element', verbose_name='Element')),
            ],
            options={
                'verbose_name': 'simple ion',
                'verbose_name_plural': 'simple ions',
            },
        ),
        migrations.CreateModel(
            name='Reaction',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, verbose_name='Id')),
                ('conditions', models.CharField(max_length=16, verbose_name='Conditions')),
                ('video', models.FileField(default='', upload_to='reactions/', verbose_name='Video')),
                ('covalent_products', models.ManyToManyField(related_name='covalent_products', to='api.covalentsubstance', verbose_name='Complex Products')),
                ('covalent_reactives', models.ManyToManyField(related_name='covalent_reactives', to='api.covalentsubstance', verbose_name='Complex Reactives')),
                ('ionic_products', models.ManyToManyField(related_name='ionic_products', to='api.ionicsubstance', verbose_name='Ionic Products')),
                ('ionic_reactives', models.ManyToManyField(related_name='ionic_reactives', to='api.ionicsubstance', verbose_name='Ionic Reactives')),
            ],
            options={
                'verbose_name': 'reaction',
                'verbose_name_plural': 'reactions',
            },
        ),
        migrations.AddField(
            model_name='ionicsubstance',
            name='simple_ions',
            field=models.ManyToManyField(blank=True, to='api.simpleion', verbose_name='Simple Ions'),
        ),
        migrations.CreateModel(
            name='ElementCountInIon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.CharField(max_length=1, verbose_name='Count')),
                ('valency', models.CharField(max_length=1, verbose_name='Valency')),
                ('complex_ion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.complexion')),
                ('element', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.element')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ElementCountInCovalentSubstance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.CharField(max_length=1, verbose_name='Count')),
                ('valency', models.CharField(max_length=1, verbose_name='Valency')),
                ('element', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.element')),
                ('substance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.covalentsubstance')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='covalentsubstance',
            name='elements',
            field=models.ManyToManyField(through='api.ElementCountInCovalentSubstance', to='api.element', verbose_name='Elements'),
        ),
        migrations.AddField(
            model_name='covalentsubstance',
            name='klass',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.klass', verbose_name='Class'),
        ),
        migrations.AddField(
            model_name='complexion',
            name='elements',
            field=models.ManyToManyField(through='api.ElementCountInIon', to='api.element', verbose_name='Elements'),
        ),
        migrations.AddField(
            model_name='klass',
            name='unique_reactions',
            field=models.ManyToManyField(blank=True, to='api.reaction', verbose_name='Unique Reactions'),
        ),
    ]
