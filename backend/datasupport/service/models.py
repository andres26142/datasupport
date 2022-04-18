from django.db import models
from clientes.models import Cliente

class Servicio (models.Model):
    def __str__(self) -> str:
        return self.nombre
    class Meta:
        verbose_name_plural="Servicios"
    nombre=models.CharField(max_length=250)
    horas = models.CharField(max_length=3)

class Contract(models.Model):
    def __str__(self) -> str:
        return self.servicio.nombre+" - "+self.cliente.nombre+" - "+self.especialista.nombre
    servicio = models.ForeignKey(Servicio, on_delete=models.DO_NOTHING, related_name='servicio_fk')
    cliente = models.ForeignKey(Cliente, on_delete=models.DO_NOTHING, related_name='cliente_fk')
    especialista = models.ForeignKey(Cliente, on_delete=models.DO_NOTHING, related_name='especialista_fk')