from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import Boleto, Evento, Producto

def index_examen(request):
    eventos_list = Evento.objects.all()[:3]
    return render(request, 'examen/index.html', {'eventos': eventos_list})

def eventos(request):
    eventos_list = Evento.objects.all()
    return render(request, 'examen/events.html', {'eventos': eventos_list})

def tickets(request):
    tickets_list = Boleto.objects.all()
    return render(request, 'examen/tickets.html', {'tickets': tickets_list})

def productos(request):
    productos_list = Producto.objects.all()
    return render(request, 'productos.html', {'productos': productos_list})

