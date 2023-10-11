from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.db.models import Q
from api.models import Ion
from api.serializers import IonSerializer

class CationListView(ListAPIView):
  serializer_class = IonSerializer
  queryset = Ion.objects.filter(positive=True)
  
class AnionListView(ListAPIView):
  serializer_class = IonSerializer
  queryset = Ion.objects.filter(positive=False)