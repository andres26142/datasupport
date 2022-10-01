from django.db import models
from persona.models import Cliente,Especialista

class Servicio (models.Model):
    def __str__(self) -> str:
        return self.nombre
    class Meta:
        verbose_name_plural="Servicios"
    nombre=models.CharField(max_length=250)
    descripcion=models.CharField(max_length=250)
    estado=models.BooleanField(default=True)

class ServicioPrestado(models.Model):
    def __str__(self) -> str:
        return self.servicio.nombre+" - "+self.cliente.nombre+" - "+self.especialista.nombre
    class Meta:
        verbose_name_plural="Servicios Prestados"
    servicio = models.ForeignKey(Servicio, on_delete=models.DO_NOTHING, related_name='servicio_fk')
    cliente = models.ForeignKey(Cliente, on_delete=models.DO_NOTHING, related_name='cliente_fk')
    especialista = models.ForeignKey(Especialista, on_delete=models.DO_NOTHING, related_name='especialista_fk')
    horas = models.CharField(max_length=3)
    descripcion=models.CharField(max_length=250)
    fecha=models.DateField()
    #gei