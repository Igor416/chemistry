from django.urls import path
from . import views

urlpatterns = [
	path('elements/', views.ElementsListView.as_view()),
  path('elements/<atomic_number>/', views.ElementRetrieveView.as_view()),
	path('klasses/', views.KlassesListView.as_view()),
	path('', views.WorkerView.as_view())
]
