from django.db import models
from .substance import CovalentSubstance, IonicSubstance
from uuid import uuid4

class Reaction(models.Model):
  id = models.UUIDField('Id', default = uuid4, primary_key = True)
  covalent_reactives = models.ManyToManyField(CovalentSubstance, related_name='covalent_reactives', verbose_name='Complex Reactives')
  ionic_reactives = models.ManyToManyField(IonicSubstance, related_name='ionic_reactives', verbose_name='Ionic Reactives')
  covalent_products = models.ManyToManyField(CovalentSubstance, related_name='covalent_products', verbose_name='Complex Products')
  ionic_products = models.ManyToManyField(IonicSubstance, related_name='ionic_products', verbose_name='Ionic Products')
  conditions = models.CharField('Conditions', max_length=16)
  video = models.FileField('Video', upload_to='reactions/', default='')
      
  class Meta:
    verbose_name = 'reaction'
    verbose_name_plural = 'reactions'
