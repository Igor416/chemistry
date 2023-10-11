from rest_framework.serializers import ModelSerializer

class ToJSStyleSerializer(ModelSerializer):
  def to_representation(self, instance):
    r = super().to_representation(instance)
    for key in r.copy().keys():
      if '_' in key:
        r.update({key.split('_')[0] + ''.join([el.title() for el in key.split('_')[1:]]): r.pop(key)})
    return r