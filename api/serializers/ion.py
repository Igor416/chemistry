from .to_js_style_serializer import ToJSStyleSerializer
from .element_count import ElementCountInIonSerializer
from api.models import Ion

class IonSerializer(ToJSStyleSerializer):
  elements = ElementCountInIonSerializer(source='elementcountinion_set', many=True)
  main_element_count = ElementCountInIonSerializer()
  
  class Meta:
    model = Ion
    exclude = ['positive']
  
  def to_representation(self, instance):
    r = super().to_representation(instance)
    r['oxidation'] = instance.oxidation
    r['mainElement'] = r['mainElementCount']['element']
    del r['mainElementCount']
    return r
  