from rest_framework.views import APIView, Response
from django.db import models
from api.models import Element, Ion, ElementCountInIon
from api.serializers import ElementSerializer, ElementCountInIonSerializer, IonSerializer
from requests import get
from bs4 import BeautifulSoup, Tag
import json

class WorkerView(APIView):
  def get(self, response):
    for ion in Ion.objects.all():
      ion.save()
    return Response()