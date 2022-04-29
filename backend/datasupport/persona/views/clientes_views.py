from persona.models import Cliente
from persona.serializers import ClienteSerializer
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from datasupport.utils import responses
from drf_yasg.utils import swagger_auto_schema

@api_view(['GET'])
def clienteOverview(request):
    clientes_urls = {
        '[GET] Todos los clientes': 'personas/clientes/',
        '[GET] Buscar cliente por nombre': 'personas/clientes/?nombre=nombre',
        '[GET] Buscar cliente por id': 'personas/clientes/?id=id',
        '[POST] Añadir cliente': 'personas/clientes/create/',
        '[PATCH] Actualizar cliente': 'personas/clientes/update/<int:pk>/',
        '[PATCH] Activar cliente': 'personas/clientes/activate/<int:pk>/',
        '[DELETE] Eliminar cliente': 'personas/clientes/delete/<int:pk>/'
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
        
@swagger_auto_schema(methods=['post'], request_body=ClienteSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crearCliente(request):
    cliente = ClienteSerializer(data=request.data)

    if cliente.is_valid():
        cliente.save()
        return Response(responses.creado,status=status.HTTP_201_CREATED)
    return Response(cliente.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(methods=['patch'], request_body=ClienteSerializer)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateCliente(request, pk):
    cliente = Cliente.objects.filter(pk=pk,estado=True)
    if cliente.exists():
        serializer = ClienteSerializer(instance=cliente,data=request.data,partial=True)
        if serializer.is_valid():
            if len(serializer.validated_data)>0:
                serializer.update(instance=cliente.get(), validated_data=request.data)
                return Response(responses.actualizado,status=status.HTTP_200_OK)
            return Response(responses.no_actualizado,status=status.HTTP_400_BAD_REQUEST)
        
    return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(methods=['delete'], request_body=ClienteSerializer)
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

@swagger_auto_schema(methods=['patch'], request_body=ClienteSerializer)
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
    
