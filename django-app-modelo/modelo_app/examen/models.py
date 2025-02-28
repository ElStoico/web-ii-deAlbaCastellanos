from django.db import models

# Create your models here.

class Localidad(models.Model):
    name = models.CharField(max_length=100)
    estatus = models.BooleanField()

    def __str__(self):
        return self.name

class Evento(models.Model):
    name = models.CharField(max_length=300)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    localidad = models.ForeignKey(Localidad, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Producto(models.Model):
    name = models.CharField(max_length=200)
    precio = models.FloatField()
    localidad = models.ForeignKey(Localidad, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

class Boleto(models.Model):
    precio = models.FloatField()
    tipo_boleto_id = models.IntegerField(null=True, blank=True)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    fecha = models.DateTimeField()

    def __str__(self):
        return f"Boleto para {self.evento.name} - {self.precio}"


