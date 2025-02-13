from django.shortcuts import render
from .models import Question

# Create your views here.
from django.http import HttpResponse


def indexOrders(request):
    questions = Question.objects.all()
    data = {
        "questions":questions,
        "titulo":"Index de orders",
        "total_orders":100,
        "total_payments":100,
        "orders":[
            {
                "id":1, "total":100,
            },
            {
                "id":2, "total":200
            },
            {
                "id":3, "total":300
            },
            {
                "id":4, "total":400
            }
        ]
    }
    return render(request, 'orders/index.html', data)

