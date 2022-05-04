from persona.models import Especialista
from persona.serializers import EspecialistaSerializer
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from datasupport.utils import responses
from drf_yasg.utils import swagger_auto_schema

@api_view(['GET'])
def especialistaOverview(request):
    especialistas_urls = {
        '[GET] Todos los especialistas': 'personas/especialistas/',
        '[GET] Buscar especialista por nombre': 'personas/especialistas/?nombre=nombre',
        '[GET] Buscar especialista por id': 'personas/especialistas/?id=id',
        '[POST] Añadir especialista': 'personas/especialistas/create/',
        '[PATCH] Actualizar especialista': 'personas/especialistas/update/<int:pk>/',
        '[PATCH] Activar especialista': 'personas/especialistas/activate/<int:pk>/',
        '[DELETE] Eliminar especialista': 'personas/especialistas/delete/<int:pk>/'
    }
  
    return Response(especialistas_urls)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listEspecialista(request):
    if 'nombre' in request.query_params or 'id' in request.query_params or 'area' in request.query_params and 'format' not in request.query_params:
        especialistas = Especialista.objects.filter(**request.query_params.dict(),estado=True)
    else:
        especialistas = Especialista.objects.filter(estado=True)
    if especialistas:
        data = EspecialistaSerializer(especialistas,many=True)
        return Response(data.data)
    else:
        return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)
        
@swagger_auto_schema(methods=['post'], request_body=EspecialistaSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crearEspecialista(request):
    especialista = EspecialistaSerializer(data=request.data)

    if especialista.is_valid():
        especialista.save()
        return Response(responses.creado,status=status.HTTP_201_CREATED)
    return Response(especialista.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(methods=['patch'], request_body=EspecialistaSerializer)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateEspecialista(request, pk):
    especialista = Especialista.objects.filter(pk=pk,estado=True)
    if especialista.exists():
        serializer = EspecialistaSerializer(instance=especialista.get(),data=request.data,partial=True)
        if serializer.is_valid():
            if len(serializer.validated_data)>0:
                serializer.update(instance=especialista.get(), validated_data=request.data)
                return Response(responses.actualizado,status=status.HTTP_200_OK)
            return Response(responses.no_actualizado,status=status.HTTP_400_BAD_REQUEST)
        
    return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(methods=['delete'], request_body=EspecialistaSerializer)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteEspecialista(request, pk):
    especialista = Especialista.objects.filter(pk=pk,estado=True)
    if especialista.exists():
        json_delete={
            'estado':False
        }
        serializer = EspecialistaSerializer(instance=especialista,data=json_delete,partial=True)
        if serializer.is_valid():
            serializer.update(instance=especialista.get(), validated_data=json_delete)
            return Response(responses.eliminado,status=status.HTTP_200_OK)
    return Response(responses.not_found, status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(methods=['patch'], request_body=EspecialistaSerializer)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsAdminUser])
def activateEspecialista(request, pk):
    especialista = Especialista.objects.filter(pk=pk,estado=False)
    if especialista.exists():
        json_delete={
            'estado':True
        }
        serializer = EspecialistaSerializer(instance=especialista,data=json_delete,partial=True)
        if serializer.is_valid():
            serializer.update(instance=especialista.get(), validated_data=json_delete)
            return Response(responses.actualizado,status=status.HTTP_200_OK)
    return Response(responses.not_found, status=status.HTTP_404_NOT_FOUND)