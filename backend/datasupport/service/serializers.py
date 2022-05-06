from rest_framework import serializers
from service.models import Servicio,ServicioPrestado
from persona.serializers import ClienteSerializer, EspecialistaSerializer 
class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        exclude=['estado']
class ServicioPrestadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicioPrestado
        fields='__all__'
    def validate_cliente(self, attrs):
        print(attrs)
        if attrs.estado is False:
            raise serializers.ValidationError({
                'status':400,
                "mensaje":"Este cliente no existe"
            })
        return super().validate(attrs)
class ServicioPrestadoSerializerListar(serializers.ModelSerializer):
    cliente=ClienteSerializer()
    especialista=EspecialistaSerializer() 
    servicio=ServicioSerializer() 
    class Meta:
        model = ServicioPrestado
        fields='__all__'
        