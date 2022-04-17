from django.db import models

class Cliente (models.Model):
    class Meta:
        verbose_name_plural="Clientes"
    cedula_ciudadania=models.CharField(max_length=12, unique=True)
    nombre=models.CharField(max_length=250)