from clientes.models import Cliente
from clientes.serializers import ClienteSerializer
from rest_framework import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datasupport.utils import responses

@api_view(['GET'])
def ClienteOverview(request):
    clientes_urls = {
        '[GET] Todos los clientes': '/',
        '[GET] Buscar cliente por nombre': '/?nombre=nombre',
        '[GET] Buscar cliente por id': '/?id=id',
        '[POST] Añadir cliente': '/',
        '[PATCH] Actualizar cliente': '/update/<int:pk>/',
        '[DELETE] Eliminar cliente': '/delete/<int:pk>/'
    }
  
    return Response(clientes_urls)
@api_view(['GET'])
def list(request):
    if 'nombre' in request.query_params or 'id' in request.query_params and 'format' not in request.query_params:
        clientes = Cliente.objects.filter(**request.query_params.dict())
    else:
        clientes = Cliente.objects.all()
    if clientes:
        data = ClienteSerializer(clientes,many=True)
        return Response(data.data)
    else:
        return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
def create(request):
    cliente = ClienteSerializer(data=request.data)

    if cliente.is_valid():
        cliente.save()
        return Response(cliente.data)
    return Response(cliente.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def update(request, pk):
    cliente = Cliente.objects.filter(pk=pk)
    if cliente.exists():
        data = ClienteSerializer(instance=cliente, data=request.data)
        if data.is_valid():
            data.save()
            return Response(data.data)
        return Response(data.errors,status=status.HTTP_400_BAD_REQUEST)
    return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete(request, pk):
    cliente = Cliente.objects.filter(pk=pk)
    if cliente.exists():
        cliente.delete()
        return Response(responses.eliminado)
    return Response(responses.not_found, status=status.HTTP_404_NOT_FOUND)
    
