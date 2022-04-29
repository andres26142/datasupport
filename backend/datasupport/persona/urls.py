

from persona.views import especialistas_views, clientes_views 
from django.urls import path
  
urlpatterns = [
      path('clientes/overview', clientes_views.clienteOverview, name='home'),
      path('clientes/create/', clientes_views.crearCliente, name='create_clientes'),
      path('clientes/', clientes_views.listCliente, name='list_clientes'),
      path('clientes/update/<int:pk>/', clientes_views.updateCliente, name='update_clientes'),
      path('clientes/delete/<int:pk>/', clientes_views.deleteCliente, name='delete_clientes'),
      path('clientes/activate/<int:pk>/', clientes_views.activateCliente, name='delete_clientes'),
      path('especialistas/overview', especialistas_views.especialistaOverview, name='home'),
      path('especialistas/create/', especialistas_views.crearEspecialista, name='create_especialistas'),
      path('especialistas/', especialistas_views.listEspecialista, name='list_especialistas'),
      path('especialistas/update/<int:pk>/', especialistas_views.updateEspecialista, name='update_especialistas'),
      path('especialistas/delete/<int:pk>/', especialistas_views.deleteEspecialista, name='delete_especialistas'),
      path('especialistas/activate/<int:pk>/', especialistas_views.activateEspecialista, name='delete_especialistas'),
      
]