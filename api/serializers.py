from rest_framework.serializers import ModelSerializer
from .models import Element, Klass, families

class ElementSerializer(ModelSerializer):
    class Meta:
        model = Element
        fields = '__all__'
    
    def to_representation(self, instance):
        r = super().to_representation(instance)
        period = int(instance.period)
                
        r['group'] = int(instance.group)
        r['period'] = period
        r['mass'] = float(instance.mass)
        r['oxidations'] = instance.oxidations.split(',') if instance.oxidations != '' else []
        r['configuration'] = instance.configuration.split(',')
        
        electrons = [j ** 2 * 2 for j in range(1, period)] + [0]
        for j in range(4, period + 1, 2):
            if period + 1 > j:
                electrons[-(j // 2)] = (j // 2) ** 2 * 2
        for i in range(len(electrons)):
            for config in r['configuration']:
                if config.startswith(str(i + 1)):
                    electrons[i] += int(config.split('#')[1])
                    
        r['electrons'] = reversed(electrons)
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