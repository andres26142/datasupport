
from clientes import views 
from django.urls import path
  
urlpatterns = [
      path('overview', views.ClienteOverview, name='home'),
      path('create/', views.create, name='create_clientes'),
      path('', views.list, name='list_clientes'),
      path('update/<int:pk>/', views.update, name='update_clientes'),
      path('delete/<int:pk>/', views.delete, name='delete_clientes'),
]