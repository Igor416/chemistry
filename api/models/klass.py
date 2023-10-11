from django.db import models

class Klass(models.Model):
  name = models.CharField('Name', primary_key=True, max_length=32)
  reacts_with = models.ManyToManyField('self', verbose_name='Reacts With', blank=True)
  unique_reactions = models.ManyToManyField('Reaction', verbose_name='Unique Reactions', blank=True)
  is_organic = models.BooleanField('Is Organic', default=True)
  suffix = models.CharField('Suffix', max_length=8)
  article = models.TextField('Article', blank=True)
  image = models.ImageField('Image', upload_to='klasses/', blank=True)
  
  def __str__(self):
    return self.name
      
  class Meta:
    verbose_name = 'klass'
    verbose_name_plural = 'klasses'