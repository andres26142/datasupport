from rest_framework import serializers
from service.models import Servicio,ServicioPrestado
from persona.serializers import ClienteSerializer, EspecialistaSerializer 
class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        exclude=['estado']
class ServicioPrestadoSerializer(serializers.ModelSerializer):
    cliente=ClienteSerializer()
    especialista=EspecialistaSerializer()  
    class Meta:
        model = ServicioPrestado
        fields='__all__'
        