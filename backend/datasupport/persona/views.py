from persona.models import Cliente
from persona.serializers import ClienteSerializer
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from datasupport.utils import responses


@api_view(['GET'])
def clienteOverview(request):
    clientes_urls = {
        '[GET] Todos los clientes': 'clientes/',
        '[GET] Buscar cliente por nombre': 'clientes/?nombre=nombre',
        '[GET] Buscar cliente por id': 'clientes/?id=id',
        '[POST] Añadir cliente': 'clientes/create/',
        '[PATCH] Actualizar cliente': 'clientes/update/<int:pk>/',
        '[DELETE] Eliminar cliente': 'clientes/delete/<int:pk>/'
    }
  
    return Response(clientes_urls)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listCliente(request):
    if 'nombre' in request.query_params or 'id' in request.query_params and 'format' not in request.query_params:
        clientes = Cliente.objects.filter(**request.query_params.dict(),estado=True)
    else:
        clientes = Cliente.objects.filter(estado=True)
    if clientes:
        data = ClienteSerializer(clientes,many=True)
        return Response(data.data)
    else:
        return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crearCliente(request):
    cliente = ClienteSerializer(data=request.data)

    if cliente.is_valid():
        cliente.save()
        return Response(responses.creado,status=status.HTTP_201_CREATED)
    return Response(cliente.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateCliente(request, pk):
    cliente = Cliente.objects.filter(pk=pk,estado=True)
    if cliente.exists():
        serializer = ClienteSerializer(instance=cliente,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.update(instance=cliente.get(), validated_data=request.data)
            return Response(responses.actualizado,status=status.HTTP_200_OK)
        
    return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCliente(request, pk):
    cliente = Cliente.objects.filter(pk=pk,estado=True)
    if cliente.exists():
        json_delete={
            'estado':False
        }
        serializer = ClienteSerializer(instance=cliente,data=json_delete,partial=True)
        if serializer.is_valid():
            serializer.update(instance=cliente.get(), validated_data=json_delete)
            return Response(responses.eliminado,status=status.HTTP_200_OK)
    return Response(responses.not_found, status=status.HTTP_404_NOT_FOUND)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsAdminUser])
def activateCliente(request, pk):
    cliente = Cliente.objects.filter(pk=pk,estado=False)
    if cliente.exists():
        json_delete={
            'estado':True
        }
        serializer = ClienteSerializer(instance=cliente,data=json_delete,partial=True)
        if serializer.is_valid():
            serializer.update(instance=cliente.get(), validated_data=json_delete)
            return Response(responses.actualizado,status=status.HTTP_200_OK)
    return Response(responses.not_found, status=status.HTTP_404_NOT_FOUND)
    
