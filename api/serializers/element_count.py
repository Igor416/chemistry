from .to_js_style_serializer import ToJSStyleSerializer
from .element import ElementSerializer
from api.models import ElementCountInIon

class ElementCountInIonSerializer(ToJSStyleSerializer):
  element = ElementSerializer()
  
  class Meta:
    model = ElementCountInIon
    fields = ['element', 'count', 'oxidation', 'ion']