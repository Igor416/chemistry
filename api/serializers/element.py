from api.models import Element, families
from .to_js_style_serializer import ToJSStyleSerializer
from rest_framework.serializers import FloatField

class ElementSerializer(ToJSStyleSerializer):
  electronegativity = FloatField()
  
  class Meta:
    model = Element
    fields = ['atomic_number', 'symbol', 'oxidations', 'electronegativity']
  
  def to_representation(self, instance):
    r = super().to_representation(instance)
    convert = lambda num: int(num[0]) if num.endswith('+') else -int(num[0])
    r['oxidations'] = list(map(convert, instance.oxidations.split(','))) if instance.oxidations != '' else []
    return r

class DetailedElementSerializer(ElementSerializer):
  mass = FloatField()
  class Meta(ElementSerializer.Meta):
    fields = '__all__'
      
  def to_representation(self, instance):
    r = super().to_representation(instance)
    r['configuration'] = instance.configuration.split(',')
    
    electrons = [j ** 2 * 2 for j in range(1, instance.period)] + [0]
    for j in range(4, instance.period + 1, 2):
      if instance.period + 1 > j:
        electrons[-(j // 2)] = (j // 2) ** 2 * 2
    for i in range(len(electrons)):
      for config in r['configuration']:
        if config.startswith(str(i + 1)):
          electrons[i] += int(config.split('#')[1])
          
    r['electrons'] = reversed(electrons)
    r['color'] = families[instance.family]
    return r