from service.models import ServicioPrestado
from service.serializers import ServicioPrestadoSerializer, ServicioPrestadoSerializerListar
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from datasupport.utils import responses
from drf_yasg.utils import swagger_auto_schema

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listServicioPrestado(request):
    request.query_params._mutable=True
    if 'cliente' in request.query_params or 'especialista' in request.query_params and 'format' not in request.query_params:
        if 'fecha_inicio' in request.query_params and 'fecha_final' in request.query_params:
            fecha_inicio=request.query_params['fecha_inicio']
            fecha_final=request.query_params['fecha_final']
            request.query_params.pop('fecha_inicio')
            request.query_params.pop('fecha_final')
            servicios_prestados = ServicioPrestado.objects.filter(**request.query_params.dict(),fecha__gte=fecha_inicio,fecha__lte=fecha_final)
        else:
            return Response(responses.error_parametros,status=status.HTTP_400_BAD_REQUEST)
    else:
        try:
            servicios_prestados = ServicioPrestado.objects.filter(**request.query_params.dict())
        except:
            return Response(responses.error_parametros,status=status.HTTP_400_BAD_REQUEST)
    if servicios_prestados:
        data = ServicioPrestadoSerializerListar(servicios_prestados,many=True)
        return Response(data.data)
    else:
        return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)
@swagger_auto_schema(methods=['post'], request_body=ServicioPrestadoSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crearServicioPrestado(request):
    servicios_prestados = ServicioPrestadoSerializer(data=request.data)                 
    if servicios_prestados.is_valid():
        servicios_prestados.save()
        return Response(responses.creado,status=status.HTTP_201_CREATED)
    return Response(servicios_prestados.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(methods=['patch'], request_body=ServicioPrestadoSerializer)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated,IsAdminUser])
def updateServicioPrestado(request, pk):
    try: 
        servicios = ServicioPrestado.objects.get(pk=pk)
    except:
        return Response(responses.not_found,status=status.HTTP_404_NOT_FOUND)
    
    serializer = ServicioPrestadoSerializer(servicios,data=request.data,partial=True)
    if serializer.is_valid():
        if len(serializer.validated_data)>0:
            serializer.save(instance=servicios, validated_data=request.data)
            return Response(responses.actualizado,status=status.HTTP_200_OK)
        return Response(responses.no_actualizado,status=status.HTTP_400_BAD_REQUEST)
        
    

@swagger_auto_schema(methods=['delete'], request_body=ServicioPrestadoSerializer)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated,IsAdminUser])
def deleteServicioPrestado(request, pk):
    servicios = ServicioPrestado.objects.filter(pk=pk)
    if servicios.exists():
        servicios.delete()
        return Response(responses.eliminado,status=status.HTTP_200_OK)
    return Response(responses.not_found, status=status.HTTP_404_NOT_FOUND)

