from rest_framework.views import APIView, Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Element, Klass
from .serializers import ElementSerializer, KlassSerializer

class ElementsListView(ListAPIView):
    serializer_class = ElementSerializer
    queryset = Element.objects.all()

class ElementRetrieveView(RetrieveAPIView):
    lookup_url_kwarg = 'symbol'
    lookup_field = 'symbol'
    serializer_class = ElementSerializer
    queryset = Element.objects.all()

class KlassesListView(ListAPIView):
    serializer_class = KlassSerializer
    queryset = Klass.objects.all()
    
class WorkerView(APIView):
    def get(self, response):
        return Response(ElementSerializer(Element.objects.all(), many=True).data)