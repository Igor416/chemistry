from rest_framework.serializers import ModelSerializer
from .models import Element, Klass, families

class ElementSerializer(ModelSerializer):
    class Meta:
        model = Element
        fields = '__all__'
        
    def to_representation(self, instance):
        r = super().to_representation(instance)
        r['group'] = int(instance.group)
        r['period'] = int(instance.period)
        r['mass'] = float(instance.mass)
        r['oxidations'] = r['oxidations'].split(',') if r['oxidations'] != '' else []
        r['color'] = families[instance.family]
        return r

class KlassSerializer(ModelSerializer):
    class Meta:
        model = Klass
        exclude = ['id']
    
    def to_representation(self, instance):
        r = super().to_representation(instance)
        r['reacts_with'] = list(map(lambda id: Klass.objects.get(id=id).name, r['reacts_with']))
        return r