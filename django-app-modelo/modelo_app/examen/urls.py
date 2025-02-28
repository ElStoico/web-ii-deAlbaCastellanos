from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_examen, name='index_examen'),
    path('eventos/', views.eventos, name='eventos'),
    path('tickets/', views.tickets, name='tickets'),
    path('productos/', views.productos, name='productos')
]
