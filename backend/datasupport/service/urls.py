
from service.views import servicio_views 
from django.urls import path
  
urlpatterns = [
      path('create/', servicio_views.crearServicio, name='create_servicios'),
      path('', servicio_views.listServicio, name='list_servicios'),
      path('update/<int:pk>/', servicio_views.updateServicio, name='update_servicios'),
      path('delete/<int:pk>/', servicio_views.deleteServicio, name='delete_servicios'),
      path('activate/<int:pk>/', servicio_views.activateServicio, name='delete_servicios')
]