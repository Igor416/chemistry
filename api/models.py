from django.db import models
from django.core.validators import int_list_validator

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

def to_choices(*args):
    return tuple([(el, el) for el in args])

# Create your models here.
class Element(models.Model):
    atomic_number = models.SmallIntegerField('Atomic Number', primary_key=True, unique=True)
    symbol = models.CharField('Symbol', max_length=2, unique=True)
    type = models.CharField('Metal / Nonmetal / Noble Gas', choices=to_choices('Metal', 'Nonmetal', 'Noble Gas'), max_length=9)
    family = models.CharField('Family', choices=to_choices(*families.keys()), max_length=21)
    name = models.CharField('Name', max_length=16, unique=True)
    group = models.CharField('Group', max_length=2)
    period = models.CharField('Period', max_length=1)
    mass = models.DecimalField('Mass', max_digits=6, decimal_places=3)
    oxidations = models.CharField('Oxidations', validators=[int_list_validator], max_length=24)
    
    def __str__(self):
        return f'{self.atomic_number}. {self.name} ({self.symbol})'

class ElementCount(models.Model):
    element = models.ForeignKey(Element, on_delete=models.CASCADE)
    count = models.CharField('Count', max_length=1)
    valency = models.CharField('Valency', max_length=1)
    
    class Meta:
        abstract = True
    
class ElementCountInIon(ElementCount):
    complex_ion = models.ForeignKey('ComplexIon', on_delete=models.CASCADE)

class ElementCountInCovalentSubstance(ElementCount):
    substance = models.ForeignKey('CovalentSubstance', on_delete=models.CASCADE)

class Ion(models.Model):
    oxidation = models.CharField('Oxidation', max_length=2)
    
    class Meta:
        abstract = True

class SimpleIon(Ion):
    element = models.ForeignKey(Element, on_delete=models.CASCADE, verbose_name='Element')

class ComplexIon(Ion):
    elements = models.ManyToManyField(Element, through=ElementCountInIon, verbose_name='Elements')

class Klass(models.Model):
    name = models.CharField('Name', max_length=32)
    description = models.TextField('Description', blank=True)
    reacts_with = models.ManyToManyField('self', verbose_name='Reacts With', blank=True)
    unique_reactions = models.ManyToManyField('Reaction', verbose_name='Unique Reactions', blank=True)
    is_organic = models.BooleanField('Is Organic', default=True)
    
    def __str__(self):
        return self.name

class Substance(models.Model):
    name = models.CharField('Name', max_length=32, unique=True)
    description = models.TextField('Description', blank=True)
    color = models.CharField('Color', max_length=16, default='Transparent')
    smell = models.CharField('Smell', max_length=16, default='Without')
    trivial_names = models.TextField('Trivial names', blank=True)
    properties = models.CharField('Properties', choices=to_choices('acidic', 'basic', 'amphoteric', 'neutral'), max_length=10)
    klass = models.ForeignKey(Klass, verbose_name='Class', on_delete=models.CASCADE)
    
    class Meta:
        abstract = True

class CovalentSubstance(Substance):
    elements = models.ManyToManyField(Element, through=ElementCountInCovalentSubstance, verbose_name='Elements')

class IonicSubstance(Substance):
    simple_ions = models.ManyToManyField(SimpleIon, verbose_name='Simple Ions')
    complex_ions = models.ManyToManyField(ComplexIon, verbose_name='Complex Ions')
    
class Reaction(models.Model):
    covalent_reactives = models.ManyToManyField(CovalentSubstance, related_name='covalent_reactives', verbose_name='Complex Reactives')
    ionic_reactives = models.ManyToManyField(IonicSubstance, related_name='ionic_reactives', verbose_name='Ionic Reactives')
    covalent_products = models.ManyToManyField(CovalentSubstance, related_name='covalent_products', verbose_name='Complex Products')
    ionic_products = models.ManyToManyField(IonicSubstance, related_name='ionic_products', verbose_name='Ionic Products')
    conditions = models.CharField('Conditions', max_length=16)
    