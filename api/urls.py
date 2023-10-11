from django.urls import path
from . import views

urlpatterns = [
	path('elements_list/', views.ElementsNamesListView.as_view()),
	path('elements/', views.ElementsListView.as_view()),
  path('elements/<atomic_number>/', views.ElementRetrieveView.as_view()),
  path('cations/', views.CationListView.as_view()),
  path('anions/', views.AnionListView.as_view()),
  path('substances/organic/', views.OrganicSubstancesView.as_view()),
  path('substances/covalent/', views.CovalentSubstancesView.as_view()),
  path('substances/ionic/', views.IonicSubstancesView.as_view()),
	path('klasses_list/', views.KlassesNamesListView.as_view()),
	path('klasses/', views.KlassesListView.as_view()),
	path('klass/<name>/', views.KlassRetrieveView.as_view()),
	path('', views.WorkerView.as_view())
]
