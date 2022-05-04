
from service.views import servicio_views, servicio_prestado_views 
from django.urls import path
  
urlpatterns = [
      path('create/', servicio_views.crearServicio, name='create_servicios'),
      path('', servicio_views.listServicio, name='list_servicios'),
      path('update/<int:pk>/', servicio_views.updateServicio, name='update_servicios'),
      path('delete/<int:pk>/', servicio_views.deleteServicio, name='delete_servicios'),
      path('activate/<int:pk>/', servicio_views.activateServicio, name='delete_servicios'),
      path('tecnico/registrar/', servicio_prestado_views.crearServicioPrestado, name='create_servicios_prestados'),
      path('tecnico/listar/', servicio_prestado_views.listServicioPrestado, name='listar_servicios_prestados'),
      path('tecnico/eliminar/<int:pk>', servicio_prestado_views.deleteServicioPrestado, name='eliminar_servicios_prestados'),
      path('tecnico/actualizar/<int:pk>', servicio_prestado_views.updateServicioPrestado, name='actualizar_servicios_prestados'),

]