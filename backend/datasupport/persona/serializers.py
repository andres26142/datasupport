from rest_framework import serializers
from persona.models import Cliente,Especialista
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        exclude=['estado']
class EspecialistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialista
        exclude=['estado']