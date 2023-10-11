from django.urls import path
from .views import index

urlpatterns = [
	path('', index),
	path('klass/<klass>', index),
	path('klass/<klass>/editor', index)
]
