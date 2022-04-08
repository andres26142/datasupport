
from clientes import views 
from django.urls import path
  
urlpatterns = [
      path('', views.ClienteOverview, name='home'),
      path('añadir/', views.añadir_cliente, name='add-items'),
      path('listar/', views.listar_clientes, name='view_items'),
]