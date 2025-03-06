from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.utils import timezone

# Create your views here.
from django.shortcuts import render
from .models import Boleto, Evento, Producto, Localidad

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
    return render(request, 'examen/productos.html', {'productos': productos_list})

def tickets_por_evento(request, event_id):
    evento = get_object_or_404(Evento, id=event_id)
    tickets_list = Boleto.objects.filter(evento=evento)
    return render(request, 'examen/tickets.html', {'tickets': tickets_list, 'evento': evento})

def create_event(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        fecha_inicio = request.POST.get('fecha_inicio')
        fecha_fin = request.POST.get('fecha_fin')
        localidad_name = request.POST.get('localidad')

        if not all([name, fecha_inicio, fecha_fin, localidad_name]):
            return JsonResponse({'success': False, 'error': 'Todos los campos son obligatorios.'})

        try:
            fecha_inicio = timezone.make_aware(timezone.datetime.fromisoformat(fecha_inicio))
            fecha_fin = timezone.make_aware(timezone.datetime.fromisoformat(fecha_fin))
        except ValueError:
            return JsonResponse({'success': False, 'error': 'Formato de fecha inválido.'})

        if fecha_inicio < timezone.now():
            return JsonResponse({'success': False, 'error': 'La fecha de inicio debe ser mayor al día actual.'})

        if fecha_fin < fecha_inicio:
            return JsonResponse({'success': False, 'error': 'La fecha de fin no puede ser menor que la fecha de inicio.'})

        localidad, created = Localidad.objects.get_or_create(name=localidad_name, defaults={'estatus': True})

        if Evento.objects.filter(localidad=localidad).exists():
            return JsonResponse({'success': False, 'error': 'No se pueden agregar 2 eventos seguidos de la misma localidad.'})

        Evento.objects.create(name=name, fecha_inicio=fecha_inicio, fecha_fin=fecha_fin, localidad=localidad)
        return JsonResponse({'success': True})

    localidades = Localidad.objects.all()
    eventos = Evento.objects.order_by('-fecha_inicio')[:5]
    return render(request, 'examen/create_event.html', {'localidades': localidades, 'eventos': eventos})

def delete_event(request, event_id):
    if request.method == 'DELETE':
        try:
            event = Evento.objects.get(id=event_id)
            event.delete()
            return JsonResponse({'success': True})
        except Evento.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Evento no encontrado.'})

def create_product(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        precio = request.POST.get('precio')

        if not all([name, precio]):
            return JsonResponse({'success': False, 'error': 'Todos los campos son obligatorios.'})

        try:
            precio = float(precio)
            if precio <= 0:
                return JsonResponse({'success': False, 'error': 'El precio debe ser mayor a 0.'})
        except ValueError:
            return JsonResponse({'success': False, 'error': 'Precio inválido.'})

        # Limitar a 10 productos por día
        today = timezone.now().date()
        productos_hoy = Producto.objects.filter(created_at__date=today).count()
        if productos_hoy >= 10:
            return JsonResponse({'success': False, 'error': 'No se pueden agregar más de 10 productos al día.'})

        Producto.objects.create(name=name, precio=precio)
        return JsonResponse({'success': True})

    productos = Producto.objects.order_by('-id')[:5]
    return render(request, 'examen/create_product.html', {'productos': productos})

def delete_product(request, product_id):
    if request.method == 'DELETE':
        try:
            product = Producto.objects.get(id=product_id)
            product.delete()
            return JsonResponse({'success': True})
        except Producto.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Producto no encontrado.'})

