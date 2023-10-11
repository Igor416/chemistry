from .to_js_style_serializer import ToJSStyleSerializer
from api.models import CovalentSubstance, IonicSubstance

class SubstanceSerializer(ToJSStyleSerializer):
  class Meta:
    fields = '__all__'
    
class CovalentSubstanceSerializer(SubstanceSerializer):
  class Meta(SubstanceSerializer.Meta):
    model = CovalentSubstance

class IonicSubstanceSerializer(SubstanceSerializer):
  class Meta(SubstanceSerializer.Meta):
    model = IonicSubstance