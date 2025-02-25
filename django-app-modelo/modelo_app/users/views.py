from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
import json

from .models import Users, User_Adress

def usersIndex(request):
    # Obtener todos los usuarios sin direcciones
    users = Users.objects.all().values('id', 'name', 'email', 'photo', 'age')

    return render(request, 'users/index.html', {'users': users})

def createUserView(request):
    return render(request, "users/create.html")

def createUserByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    return JsonResponse({
        "NOMBRE_RECIBIDO": body.get("name")
    })

def createUser(request):
    data={}
    try:
        if request.method == "POST":
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age")
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")

            user = Users(name = name, email = email, age = age, rfc = rfc, photo = photo)
            user.save()
            data["user"] = user
            data["message"] = "User created"
            data["status"] = "success"
    except Exception as e:
        data["message"] = str(e)
        data["status"] = "error"

    return render(request, "users/create.html", data)

def userDetail(request, id):
    user = Users.objects.get(id=id)
    data = {
        "user":user
    }
    return render(request, "users/detail.html", data)

def editUser(request, id):
    user = get_object_or_404(Users, id=id)
    addresses = User_Adress.objects.filter(user_id=user)

    if request.method == "POST":
        user.name = request.POST.get("name")
        user.email = request.POST.get("email")
        user.age = request.POST.get("age")
        user.rfc = request.POST.get("rfc")
        user.photo = request.POST.get("photo")
        user.save()
        return redirect('indexUsers')

    return render(request, 'users/edit.html', {'user': user, 'addresses': addresses})

def home(request):
    return render(request, 'home/home.html')