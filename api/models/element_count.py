from django.db import models
from .element import Element

class ElementCountManager(models.Manager):
  def get_queryset(self):
    return super().get_queryset().annotate(charge=models.ExpressionWrapper(
      models.F('count') * models.F('oxidation'), output_field=models.SmallIntegerField()
    ))

class ElementCount(models.Model):
  element = models.ForeignKey(Element, on_delete=models.CASCADE)
  count = models.SmallIntegerField('Count', default=1)
  oxidation = models.SmallIntegerField('Oxidation')
  
  objects = ElementCountManager()
  
  def __str__(self):
    return f'{self.element.symbol}{self.count if self.count != 1 else ""} {abs(self.oxidation)}{"-" if self.oxidation < 0 else "+"}'
  
  class Meta:
    abstract = True
        
class ElementCountInIon(ElementCount):
  ion = models.ForeignKey('Ion', on_delete=models.CASCADE)

class ElementCountInCovalentSubstance(ElementCount):
  substance = models.ForeignKey('CovalentSubstance', on_delete=models.CASCADE)