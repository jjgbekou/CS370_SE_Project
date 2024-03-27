from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from pymongo import MongoClient
# Establish connection to MongoDB
client = MongoClient('mongodb+srv://Austin:370@cluster0.qddlbum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
# Access or create database
db = client['SchedulingProject']
# Access or create collection for users/workers
users_collection = db['user']

# from .models import User
# from .serializers import UserSerializer

# def create_user(request):
#     # Your create user logic here
#     return JsonResponse({"message": "User created successfully"})
# def get_user(request, user_id):
#     user = get_object_or_404(User, pk=user_id)
#     #serializer = UserSerializer(user)
#     return JsonResponse(serializer.data)

# def update_user(request, user_id):
#     # Your update user logic here
#     return JsonResponse({"message": "User updated successfully"})

# def delete_user(request, user_id):
#     # Your delete user logic here
#     return JsonResponse({"message": "User deleted successfully"})

# def get_all_users(request):
#     #users = User.objects.all()
#     #serializer = UserSerializer(users, many=True)
#     return JsonResponse(safe=False)


def create_user(request):
    # Extracting data from the request (assuming it's sent as JSON)
    user_data = request.POST.get('user_data')  # Assuming user_data is sent in the request
    
    # Check if user_data is not None
    if user_data:
        # Parse the JSON data into a Python dictionary
        user_data = json.loads(user_data)
        
        # Extracting user attributes from the user_data
        lastname = user_data.get('lastname')
        firstname = user_data.get('firstname')
        worker_type = user_data.get('worker_type')
        job_type = user_data.get('job_type')
        worker_id = user_data.get('worker_id')
        hours = user_data.get('hours')
        
        # Check if all required fields are provided
        if lastname and firstname and worker_type and job_type and worker_id and hours:
            # Create a new user document to be inserted into MongoDB
            new_user = {
                'lastname': lastname,
                'firstname': firstname,
                'worker_type': worker_type,
                'job_type': job_type,
                'worker_id' : worker_id,
                'hours' : hours
                # Add more fields here if needed
            }
            
            # Insert the new user document into the MongoDB collection
            users_collection.insert_one(new_user)
            
            # Return a success message as a JSON response
            return JsonResponse({"message": "User created successfully"})
        else:
            # If any required field is missing, return a bad request response
            return JsonResponse({"error": "Missing required fields"}, status=400)
    else:
        # If no user data is provided, return a bad request response
        return JsonResponse({"error": "No user data provided"}, status=400)
