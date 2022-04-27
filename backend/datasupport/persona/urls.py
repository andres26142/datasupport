
from persona import views 
from django.urls import path
  
urlpatterns = [
      path('clientes/overview', views.clienteOverview, name='home'),
      path('clientes/create/', views.crearCliente, name='create_clientes'),
      path('clientes/', views.listCliente, name='list_clientes'),
      path('clientes/update/<int:pk>/', views.updateCliente, name='update_clientes'),
      path('clientes/delete/<int:pk>/', views.deleteCliente, name='delete_clientes'),
      path('clientes/activate/<int:pk>/', views.activateCliente, name='delete_clientes'),
]