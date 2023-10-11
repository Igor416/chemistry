from api.models import Klass
from .to_js_style_serializer import ToJSStyleSerializer

class KlassSerializer(ToJSStyleSerializer):
  class Meta:
    model = Klass
    fields = ['name', 'is_organic', 'suffix']
    
class DetailedKlassSerializer(KlassSerializer):
  class Meta(KlassSerializer.Meta):
    fields = '__all__'