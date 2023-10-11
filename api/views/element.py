from rest_framework.generics import ListAPIView, RetrieveAPIView
from api.models import Element
from api.serializers import ElementSerializer, DetailedElementSerializer

class ElementsNamesListView(ListAPIView):
  serializer_class = ElementSerializer
  queryset = Element.objects.all()

class ElementsListView(ListAPIView):
  serializer_class = DetailedElementSerializer
  queryset = Element.objects.all()

class ElementRetrieveView(RetrieveAPIView):
  lookup_url_kwarg = 'atomic_number'
  lookup_field = 'atomic_number'
  serializer_class = DetailedElementSerializer
  queryset = Element.objects.all()