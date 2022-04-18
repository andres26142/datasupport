from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Rol(models.Model):
    def __str__(self) -> str:
        return self.nombre

    nombre = models.CharField(max_length=30, unique=True)
    descripcion = models.CharField(max_length=100)

class Cliente (models.Model):

    def __str__(self) -> str:
        return self.nombre
    class Meta:
        verbose_name_plural="Clientes"
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_fk')
    cedula_ciudadania=models.CharField(max_length=12, unique=True)
    nombre=models.CharField(max_length=250)
    rol = models.ForeignKey(Rol, on_delete=models.DO_NOTHING, related_name='rol_fk')