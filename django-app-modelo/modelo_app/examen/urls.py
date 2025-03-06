from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_examen, name='index_examen'),
    path('eventos/', views.eventos, name='eventos'),
    path('tickets/', views.tickets, name='tickets'),
    path('productos/', views.productos, name='productos'),
    path('tickets/evento/<int:event_id>/', views.tickets_por_evento, name='tickets_por_evento'),
    path('eventos/crear/', views.create_event, name='create_event'),
    path('eventos/eliminar/<int:event_id>/', views.delete_event, name='delete_event'),
    path('productos/crear/', views.create_product, name='create_product'),
    path('productos/eliminar/<int:product_id>/', views.delete_product, name='delete_product'),
]
