from service.models import Servicio
from service.serializers import ServicioSerializer
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from datasupport.utils import responses
from drf_yasg.utils import swagger_auto_schema

@api_view(['GET'])
def servicioOverview(request):
    servicios_urls = {
        '[GET] Todos los servicios': 'servicios/',
        '[GET] Buscar servicio por nombre': 'servicios/?nombre=nombre',
        '[GET] Buscar servicio por id': 'servicios/?id=id',
        '[POST] Añadir servicio': 'servicios/create/',
        '[PATCH] Actualizar servicio': 'servicios/update/<int:pk>/',
        '[PATCH] Activar servicio': 'servicios/activate/<int:pk>/',
        '[DELETE] Eliminar servicio': 'servicios/delete/<int:pk>/'
    }
  
    return Response(servicios_urls)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listServicio(request):
    if 'nombre' in request.query_params or 'id' in request.query_params and 'format' not in request.query_params:
        servicios = Servicio.objects.filter(**request.query_params.dict(),estado=True)
    else:
        servicios = Servicio.objects.filter(estado=True)
    if servicios:
        data = ServicioSerializer(servicios,many=True)
        return Response(data.data)
    else:
        return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)
        
@swagger_auto_schema(methods=['post'], request_body=ServicioSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crearServicio(request):
    servicios = ServicioSerializer(data=request.data)

    if servicios.is_valid():
        servicios.save()
        return Response(responses.creado,status=status.HTTP_201_CREATED)
    return Response(servicios.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(methods=['patch'], request_body=ServicioSerializer)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateServicio(request, pk):
    servicios = Servicio.objects.filter(pk=pk,estado=True)
    if servicios.exists():
        serializer = ServicioSerializer(instance=servicios.get(),data=request.data,partial=True)
        if serializer.is_valid():
            if len(serializer.validated_data)>0:
                serializer.update(instance=servicios.get(), validated_data=request.data)
                return Response(responses.actualizado,status=status.HTTP_200_OK)
            return Response(responses.no_actualizado,status=status.HTTP_400_BAD_REQUEST)
        
    return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(methods=['delete'], request_body=ServicioSerializer)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteServicio(request, pk):
    servicios = Servicio.objects.filter(pk=pk,estado=True)
    if servicios.exists():
        json_delete={
            'estado':False
        }
        serializer = ServicioSerializer(instance=servicios,data=json_delete,partial=True)
        if serializer.is_valid():
            serializer.update(instance=servicios.get(), validated_data=json_delete)
            return Response(responses.eliminado,status=status.HTTP_200_OK)
    return Response(responses.not_found, status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(methods=['patch'], request_body=ServicioSerializer)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsAdminUser])
def activateServicio(request, pk):
    servicios = Servicio.objects.filter(pk=pk,estado=False)
    if servicios.exists():
        json_delete={
            'estado':True
        }
        serializer = ServicioSerializer(instance=servicios,data=json_delete,partial=True)
        if serializer.is_valid():
            serializer.update(instance=servicios.get(), validated_data=json_delete)
            return Response(responses.actualizado,status=status.HTTP_200_OK)
    return Response(responses.not_found, status=status.HTTP_404_NOT_FOUND)