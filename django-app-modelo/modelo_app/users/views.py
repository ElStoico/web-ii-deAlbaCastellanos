from django.shortcuts import render

from .models import Users

def usersIndex(request):
    # Obtener todos los usuarios sin direcciones
    users = Users.objects.all().values('id', 'name', 'email', 'photo')
    return render(request, 'users/index.html', {'users': users})