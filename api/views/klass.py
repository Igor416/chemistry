from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from api.models import Klass
from api.serializers import KlassSerializer, DetailedKlassSerializer

class KlassesNamesListView(ListAPIView):
  serializer_class = KlassSerializer
  queryset = Klass.objects.all()
      
class KlassesListView(ListAPIView):
  serializer_class = DetailedKlassSerializer
  queryset = Klass.objects.all()

class KlassRetrieveView(RetrieveUpdateAPIView):
  permission_classes = [IsAuthenticatedOrReadOnly]
  serializer_class = DetailedKlassSerializer
  queryset = Klass.objects.all()
  lookup_url_kwarg = 'name'
  lookup_field = 'name'