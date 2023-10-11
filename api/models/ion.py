from django.db import models
from django.utils.functional import cached_property
from .element import Element
from .element_count import ElementCountInIon
from queryable_properties.properties import queryable_property

class Ion(models.Model):
  name = models.CharField('Name', max_length=16, primary_key=True)
  color = models.CharField('Color', max_length=16, default='transparent')
  main_element_count = models.ForeignKey(ElementCountInIon, on_delete=models.CASCADE, verbose_name='Main Element Count', related_name='main_element_count')
  elements = models.ManyToManyField(Element, through=ElementCountInIon, verbose_name='Elements', related_name='elements')
  positive = models.BooleanField(default=False)
  
  @cached_property
  def oxidation(self):
    return sum(ElementCountInIon.objects.filter(ion=self).values_list('charge', flat = True))
  
  @cached_property
  def formula(self):
    if self.main_element_count.element.symbol == 'C':
      m2m = ElementCountInIon.objects.filter(ion=self)
    else:
      m2m = ElementCountInIon.objects.filter(ion=self).annotate(
        sort_index=models.Case(
          models.When(element=1, then=0),
          models.When(element=self.main_element_count.element.atomic_number, then=1),
          models.When(element=8, then=2),
          output_field=models.IntegerField()
        )
      ).order_by('sort_index')
    elements = ''.join([entry.element.symbol + (str(entry.count) if entry.count != 1 else '') for entry in m2m])
    oxidation = self.oxidation
    return f'{self.name} [{elements}]{abs(oxidation) if abs(oxidation) != 1 else ""}{"-" if oxidation < 0 else "+"}'
  
  def save(self, *args, **kwargs):
    super().save(*args, **kwargs)
    self.positive = self.oxidation > 0
    super().save(*args, **kwargs)
  
  def __str__(self):
    return self.formula
  
  class Meta:
    ordering = ('main_element_count__element', 'main_element_count__oxidation')
    verbose_name = 'ion'
    verbose_name_plural = 'ions'