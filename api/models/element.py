from django.db import models
from .to_choices import to_choices

families = {
  'Alkali': 'ff6666',
  'Alkaline Earth': 'ffdead',
  'Transition Metal': 'ffc0c0',
  'Post-transition Metal': 'cccccc',
  'Metalloid': 'cccc99',
  'Other Nonmetals': 'a0ffa0',
  'Halogen': 'ffff99',
  'Noble Gas': 'c0ffff',
  'Lanthanide': 'ffbfff',
  'Actinide': 'ef99cc'
}

# Create your models here.
class Element(models.Model):
  atomic_number = models.SmallIntegerField('Atomic Number', primary_key=True)
  symbol = models.CharField('Symbol', max_length=2, unique=True)
  type = models.CharField('Type', choices=to_choices('Metal', 'Nonmetal', 'Noble Gas'), max_length=9)
  family = models.CharField('Family', choices=to_choices(*families.keys()), max_length=21)
  name = models.CharField('Name', max_length=16, unique=True)
  group = models.SmallIntegerField('Group')
  period = models.SmallIntegerField('Period')
  mass = models.DecimalField('Mass', max_digits=6, decimal_places=3, unique=True)
  electronegativity = models.DecimalField('Electronegativity', max_digits=3, decimal_places=2)
  oxidations = models.CharField('Oxidations', max_length=16)
  block = models.CharField('Block', choices=to_choices('s', 'p', 'd', 'f'), max_length=1)
  configuration = models.CharField('Configuration', max_length=128, unique=True)
  image = models.ImageField('Image', upload_to='elements/', default='')
    
  def __str__(self):
    return f'{self.atomic_number}. {self.name} ({self.symbol})'
      
  class Meta:
    ordering = ('atomic_number',)
    verbose_name = 'element'
    verbose_name_plural = 'elements'