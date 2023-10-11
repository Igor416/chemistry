from rest_framework.generics import ListAPIView
from api.models import CovalentSubstance, IonicSubstance
from api.serializers import CovalentSubstanceSerializer, IonicSubstanceSerializer

class OrganicSubstancesView(ListAPIView):
  serializer_class = CovalentSubstanceSerializer
  queryset = CovalentSubstance.objects.filter(klass__is_organic=True)
      
class CovalentSubstancesView(ListAPIView):
  serializer_class = CovalentSubstanceSerializer
  queryset = CovalentSubstance.objects.filter(klass__is_organic=False)

class IonicSubstancesView(ListAPIView):
  serializer_class = IonicSubstanceSerializer
  queryset = IonicSubstance.objects.all()