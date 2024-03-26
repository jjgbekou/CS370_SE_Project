from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import UserSerializer

def create_user(request):
    # Your create user logic here
    return JsonResponse({"message": "User created successfully"})

def get_user(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    serializer = UserSerializer(user)
    return JsonResponse(serializer.data)

def update_user(request, user_id):
    # Your update user logic here
    return JsonResponse({"message": "User updated successfully"})

def delete_user(request, user_id):
    # Your delete user logic here
    return JsonResponse({"message": "User deleted successfully"})

def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)
