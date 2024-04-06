"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
       path('create_user/', views.create_user, name='create_user'),
       path('login/', views.login, name='login'),
       path('delete_user/', views.delete_user, name='delete_user'),
       path('random_scheduler_for_desk_assistant/', views.random_scheduler_for_desk_assistant, name='random_scheduler_for_desk_assistant'),
       path('return_workers_info/', views.return_workers_info, name='return_workers_info'),
       path('get_scholarship_hours/', views.get_scholarship_hours, name='get_scholarship_hours'),
       path('update_unavailability/', views.update_unavailability, name='update_unavailability')

    #path('get_user/<int:user_id>/', views.get_user, name='get_user'), 
    #path('get_all_users/', views.get_all_users, name='get_all_users'),

]
