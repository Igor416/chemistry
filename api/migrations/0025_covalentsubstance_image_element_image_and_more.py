# Generated by Django 4.1.1 on 2023-09-25 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_remove_covalentsubstance_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='covalentsubstance',
            name='image',
            field=models.ImageField(default='', upload_to='substances/', verbose_name='Image'),
        ),
        migrations.AddField(
            model_name='element',
            name='image',
            field=models.ImageField(default='', upload_to='elements/', verbose_name='Image'),
        ),
        migrations.AddField(
            model_name='ionicsubstance',
            name='image',
            field=models.ImageField(default='', upload_to='substances/', verbose_name='Image'),
        ),
        migrations.AddField(
            model_name='klass',
            name='image',
            field=models.ImageField(default='', upload_to='klasses/', verbose_name='Image'),
        ),
        migrations.AddField(
            model_name='reaction',
            name='video',
            field=models.FileField(default='', upload_to='reactions/', verbose_name='Video'),
        ),
        migrations.AlterField(
            model_name='covalentsubstance',
            name='article',
            field=models.TextField(verbose_name='Article'),
        ),
        migrations.AlterField(
            model_name='element',
            name='oxidations',
            field=models.CharField(max_length=32, verbose_name='Oxidations'),
        ),
        migrations.AlterField(
            model_name='ionicsubstance',
            name='article',
            field=models.TextField(verbose_name='Article'),
        ),
    ]
