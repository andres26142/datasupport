from clientes.models import Cliente
from clientes.serializers import ClienteSerializer
from rest_framework import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def ClienteOverview(request):
    clientes_urls = {
        'Todos los clientes': '/',
        'Buscar cliente por nombre': '/?nombre=nombre',
        'Buscar cliente por id': '/id',
        'Añadir cliente': '/añadir',
        'Actualizar cliente': '/actualizar/id',
        'Eliminar cliente': '/cliente/id/eliminar'
    }
  
    return Response(clientes_urls)
@api_view(['GET'])
def listar_clientes(request):
    
    # checking for the parameters from the URL
    if request.query_params:
        clientes = Cliente.objects.filter(**request.query_param.dict())
    else:
        clientes = Cliente.objects.all()
  
    # if there is something in items else raise error
    if clientes:
        data = ClienteSerializer(clientes,many=True)
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
def añadir_cliente(request):
    cliente = ClienteSerializer(data=request.data)
  
    # validating for already existing data
    if Cliente.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
  
    if cliente.is_valid():
        cliente.save()
        return Response(cliente.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
