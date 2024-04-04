from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from pymongo import MongoClient
import json
import bcrypt
from datetime import datetime, timedelta
import random
# Establish connection to MongoDB
client = MongoClient('mongodb+srv://Austin:370@cluster0.qddlbum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
# Access or create database
db = client['SchedulingProject']
# Access or create collection for users/workers
users_collection = db['user']

SEMESTER_SCHOLARSHIP_HOURS = 0

def create_user(request):
    # Extracting data from the request (assuming it's sent as JSON)
    #user_data = request.POST.get('user_data')  # Assuming user_data is sent in the request
    user_data = json.loads(request.body.decode('utf-8'))
    #print(user_data)

    # Check if user_data is not None
    if user_data:
        
        # Extracting user attributes from the user_data
        lastname = user_data.get('user_data', {}).get('lastname')
        firstname = user_data.get('user_data', {}).get('firstname')
        worker_type = user_data.get('user_data', {}).get('worker_type')
        job_type = user_data.get('user_data', {}).get('job_type')
        worker_id = user_data.get('user_data', {}).get('worker_id')
        work_study_hours = user_data.get('user_data', {}).get('hours')
        email = user_data.get('user_data', {}).get('email')
        password = user_data.get('user_data', {}).get('password')
        encrypted_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        unavailability = {}

        scholarship_hours = 0

        # Check if all required fields are provided
        if lastname and firstname and worker_type and job_type and worker_id and email and password:
            # Create a new user document to be inserted into MongoDB
            if job_type == "Scholarship":
                scholarship_hours = SEMESTER_SCHOLARSHIP_HOURS
                new_user = {
                    'lastname': lastname,
                    'firstname': firstname,
                    'worker_type': worker_type,
                    'job_type': job_type,
                    'worker_id' : worker_id,
                    'hours' : scholarship_hours,
                    'email' : email,
                    'password' : encrypted_password,
                    'unavailability' : unavailability
                }
            else:
                new_user = {
                    'lastname': lastname,
                    'firstname': firstname,
                    'worker_type': worker_type,
                    'job_type': job_type,
                    'worker_id' : worker_id,
                    'hours' : work_study_hours,
                    'email' : email,
                    'password' : encrypted_password,
                    'unavailability' : unavailability
                }

            # Insert the new user document into the MongoDB collection
            users_collection.insert_one(new_user)
            
            # Return a success message as a JSON response
            return JsonResponse({"message": "User created successfully"})
        else:
            print("first else")
            # If any required field is missing, return a bad request response
            return JsonResponse({"error": "Missing required fields"}, status=400)
    else:
        print("second else")
        # If no user data is provided, return a bad request response
        return JsonResponse({"error": "No user data provided"}, status=400)    

def delete_user(request):
    # Decode JSON data from the request body
    student = json.loads(request.body.decode('utf-8'))
    
    # Extract the worker_id of the user to be deleted
    worker_id = student.get('worker_id')
    
    # Check if worker_id is provided
    if worker_id:
        # Attempt to delete the user with the specified worker_id
        result = users_collection.delete_one({'worker_id': worker_id})
        
        # Check if a user was actually deleted
        if result.deleted_count > 0:
            return JsonResponse({"message": "User deleted successfully"})
        else:
            # If no users were deleted, it means no user with the given worker_id was found
            return JsonResponse({"error": "User not found"}, status=404)
    else:
        # If no worker_id is provided in the request, return an error
        return JsonResponse({"error": "Worker ID not provided"}, status=400)

def random_scheduler_for_desk_assistant(): 
    print("DA")

    # Fetch all workers categorized as Desk assistant
    desk_assistants = users_collection.find({'job_type': 'desk assistant'})
    
    # Dictionary to store unavailability for each day
    unavailability = {
        'Monday': [],
        'Tuesday': [],
        'Wednesday': [],
        'Thursday': [],
        'Friday': [],
        'Saturday': [],
        'Sunday': []
    }

    # Iterate through each desk assistant
    for desk_assistant in desk_assistants:
        # Retrieve their unavailability
        for day, slots in desk_assistant['unavailability'].items():
            unavailability[day].extend(slots)
    
    # Generate schedule for each day
    schedule = {} 
    for day, slots in unavailability.items():
        schedule[day] = {}
        start_time = datetime.strptime('08:30', '%H:%M')
        end_time = datetime.strptime('16:30', '%H:%M')
        current_time = start_time
        while current_time < end_time:
            # Check availability of each desk assistant for the current time slot
            available_desk_assistants = []
            for da in desk_assistants:
                # Check if the desk assistant is available at the current time
                if current_time.strftime('%H:%M') not in da['unavailability'].get(day, []):
                    available_desk_assistants.append(da['firstname'] + ' ' + da['lastname'])
                    
            # Randomly select a desk assistant from the available ones
            if available_desk_assistants:
                selected_desk_assistant = random.choice(available_desk_assistants)
                # Assign desk assistant to time slot
                schedule[day][current_time.strftime('%H:%M')] = selected_desk_assistant
            current_time += timedelta(hours=1)

    return JsonResponse(schedule) # Only managers get that and then they can share it with workers

def update_unavailability(request): #Here, if worker updated its unavailability, app must check before it generates/copy-paste new schedules (next 2 weeks)
    print("Updating unavailability")
    # Decode JSON data from request body
    data = json.loads(request.body.decode('utf-8'))
    # Extract necessary data
    worker_id = data.get('user_data', {}).get('worker_id')
    unavailability = data.get('user_data', {}).get('unavailability')
    
    # Check if worker_id and unavailability are provided
    if worker_id and unavailability:
        # Find the user by worker_id and update their unavailability
        query = {'worker_id': worker_id}
        new_values = {'$set': {'unavailability': unavailability}}
        users_collection.update_one(query, new_values)
        
        # Return success response
        return JsonResponse({"message": "Unavailability updated successfully"})
    else:
        # Return error response if worker_id or unavailability is missing
        return JsonResponse({"error": "Worker ID or unavailability data missing"}, status=400)


def login(request):
    # Extract email and password from request
    data = json.loads(request.body.decode('utf-8'))
    print(data)
    email = data.get('email')
    password = data.get('password')
    # Check if email and password are provided
    if email and password:
        # Find user by email in the database
        print(email)
        user = users_collection.find_one({'email': email})
        
        # If user is found
        if user:
            # Retrieve hashed password from the database
            print(user)
            hashed_password = user.get('password')
            
            # Check if the provided password matches the hashed password
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
                # Return success message upon successful login
                return JsonResponse({"message": "Login successful"})
            else:
                # Return error response if password is incorrect
                return JsonResponse({"error": "Incorrect password"}, status=401)
        else:
            # Return error response if user with given email is not found
            return JsonResponse({"error": "User not found"}, status=404)
    else:
        # Return error response if email or password is missing
        return JsonResponse({"error": "Email or password missing"}, status=400)


def get_scholarship_hours(request):
    hours = json.loads(request.body.decode('utf-8'))
    SEMESTER_SCHOLARSHIP_HOURS = hours


def return_workers_info(request):
    #Fetch all workers fro the database
    all_workers = list(users_collection.find())
    
    workers_info = []
    for worker in all_workers:
        worker_info = {
            'worker_id' : worker.get('worker_id'),
            'firstname' : worker.get('firstname'),
            'lastname' : worker.get('lastname')
        }
        workers_info.append(worker_info)
    
    return JsonResponse({'workers':workers_info})

# def update_hours():
#     print("This update hours")


# def random_scheduler_for_mail_clerk():
#     print("MC")


# def update_desk_assistant_schedule():
#     print("New DA")


# def update_mail_clerk_schedule():
#     print("New MC")


# def update_user(request):
#     # Decode JSON data from request body
#     data = json.loads(request.body.decode('utf-8'))

#     # Extract the worker_id and other fields that could be updated
#     worker_id = data.get('worker_id')
#     updates = data.get('updates')  # Assuming updates are passed as a dictionary

#     # Check if both worker_id and updates are provided
#     if worker_id and updates:
#         # If password is in updates, it needs to be encrypted before updating
#         if 'password' in updates:
#             password = updates['password']
#             encrypted_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
#             updates['password'] = encrypted_password

#         # Construct the query for MongoDB
#         query = {'worker_id': worker_id}
#         new_values = {'$set': updates}

#         # Attempt to update the user in the database
#         result = users_collection.update_one(query, new_values)

#         # Check if the user document was found and updated
#         if result.matched_count > 0:
#             return JsonResponse({"message": "User updated successfully"})
#         else:
#             # If no user with the given worker_id was found
#             return JsonResponse({"error": "User not found"}, status=404)
#     else:
#         # If worker_id or updates are missing from the request
#         return JsonResponse({"error": "Worker ID or updates data missing"}, status=400)