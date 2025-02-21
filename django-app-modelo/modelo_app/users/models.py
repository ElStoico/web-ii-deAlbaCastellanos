from django.db import models

# Create your models here.
class Users(models.Model):
    id = models.AutoField(auto_created = True, primary_key = True, serialize = False, verbose_name ='ID')
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    age = models.IntegerField()
    rfc = models.CharField(max_length=15)
    photo = models.URLField(max_length=200, blank=True, null=True)
    created_date = models.DateTimeField().auto_now_add
    updated_date = models.DateTimeField().auto_now
    def __str__(self):
        return self.name


class User_Adress(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    street = models.CharField(max_length=150)
    zip_code = models.CharField(max_length=10)
    city = models.CharField(max_length=85)
    country = models.CharField(max_length=47)
    created_date = models.DateTimeField().auto_now_add
    updated_date = models.DateTimeField().auto_now
    def __str__(self):
        return self.user_id