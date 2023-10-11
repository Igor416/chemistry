from django.db import models

# Create your models here.
class Article(models.Model):
  TOPICS = (
    ('Equations', 'Equations'),
  )
  
  name = models.CharField('name', max_length=16, primary_key=True)
  topic = models.CharField('topic', choices=TOPICS, max_length=9)
  content = models.TextField('content')
  
  def __str__(self):
    return self.name
  
  class Meta:
    verbose_name = 'article'
    verbose_name_plural = 'articles'