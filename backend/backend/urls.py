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
       path('generate_da_schedule/', views.generate_da_schedule, name='random_scheduler_for_desk_assistant'),
       path('return_workers_info/', views.return_workers_info, name='return_workers_info'),
       path('get_scholarship_hours/', views.get_scholarship_hours, name='get_scholarship_hours'),
       path('update_unavailability/', views.update_unavailability, name='update_unavailability'),
       path('get_da_schedule/', views.get_da_schedule, name='get_da_schedule'),
       path('release_schedule/', views.release_schedule, name='release_schedule'),
       path('give_up_shift/', views.give_up_shift, name= 'give_up_shift'),
       path('apply_for_shift/', views.apply_for_shift, name= 'apply_for_shift'),
       path('create_manager/', views.create_manager, name= 'create_manager'),
       path('return_unapproved_managers_to_admin/', views.return_unapproved_managers_to_admin, name= 'return_unapproved_managers_to_admin'),
       path('approve_manager/', views.approve_manager, name= 'approve_manager'),
       
    #path('get_user/<int:user_id>/', views.get_user, name='get_user'), 
    #path('get_all_users/', views.get_all_users, name='get_all_users'),

]
