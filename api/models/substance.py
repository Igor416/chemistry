from django.db import models
from .klass import Klass
from .element import Element
from .element_count import ElementCountInCovalentSubstance
from .ion import Ion
from .to_choices import to_choices

class Substance(models.Model):
  name = models.CharField('Name', max_length=64, primary_key=True)
  color = models.CharField('Color', max_length=16, default='Transparent')
  smell = models.CharField('Smell', max_length=16, default='Without')
  trivial_names = models.TextField('Trivial names', blank=True)
  aggregation_state = models.CharField('Aggregation State', choices=to_choices('gaseous', 'liquid', 'solid'), max_length=7)
  properties = models.CharField('Properties', choices=to_choices('acidic', 'basic', 'amphoteric', 'neutral'), max_length=10)
  klass = models.ForeignKey(Klass, verbose_name='Class', on_delete=models.CASCADE)
  article = models.TextField('Article')
  image = models.ImageField('Image', upload_to='substances/', default='')
      
  class Meta:
    abstract = True

class CovalentSubstance(Substance):
  elements = models.ManyToManyField(Element, through=ElementCountInCovalentSubstance, verbose_name='Elements')

  def __str__(self):
    return self.formula + ' ' + self.name
  
  @property
  def formula(self):
    m2m = ElementCountInCovalentSubstance.objects.filter(substance=self).order_by('element__electronegativity')
    return "".join([entry.element.symbol + (entry.count if entry.count != "1" else "") for entry in m2m])
  
  class Meta:
    verbose_name = 'covalent substance'
    verbose_name_plural = 'covalent substances'

class IonicSubstance(Substance):
  cation = models.ForeignKey(Ion, verbose_name='Cation', limit_choices_to={'positive': True}, related_name='cations', null=True, on_delete=models.SET_NULL)
  anion = models.ForeignKey(Ion, verbose_name='Anion', limit_choices_to={'positive': False}, related_name='anions', null=True, on_delete=models.SET_NULL)
  soluble = models.BooleanField('Soluble')
      
  def __str__(self):
    return self.formula + ' ' + self.name
  
  @property
  def formula(self):
    return self.render_ion(self.cation, self.anion.oxidation) + ' ' + self.render_ion(self.anion, self.cation.oxidation)
  
  def render_ion(self, ion, pairs):
    pairs = int(pairs[0])
    count = pairs / int(ion.oxidation[0])
    if count <= 1:
      return str(ion)
    elif count - int(count) == 0:
      return f'({ion}){int(count)}'
    return f'({ion}){pairs}'
  
  class Meta:
    verbose_name = 'ionic substance'
    verbose_name_plural = 'ionic substances'