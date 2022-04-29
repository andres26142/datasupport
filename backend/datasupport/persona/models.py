from django.db import models
from drf_yasg import openapi

class Cliente (models.Model):
    def __str__(self) -> str:
        return self.nombre
    class Meta:
        verbose_name_plural="Clientes"


    cedula_ciudadania=models.CharField(max_length=12, unique=True)
    nombre=models.CharField(max_length=250)
    estado=models.BooleanField(default=True)
class Especialista (models.Model):
    def __str__(self) -> str:
        return self.nombre
    class Meta:
        verbose_name_plural="Especialistas"
    cedula_ciudadania=models.CharField(max_length=12, unique=True)
    nombre=models.CharField(max_length=250)
    area=models.CharField(max_length=250)
    estado=models.BooleanField(default=True)