from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from pymongo import MongoClient
import json
import bcrypt
from datetime import datetime, timedelta
import random
from bson import json_util
from bson import ObjectId
import jwt
# Establish connection to MongoDB
client = MongoClient('mongodb+srv://Austin:370@cluster0.qddlbum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
# Access or create database
db = client['SchedulingProject']
# Access or create collection for users/workers
users_collection = db['user']
schedule = db['schedule']
managers_collection = db['manager']

SEMESTER_SCHOLARSHIP_HOURS = 51

def create_manager(request):
    #Create a manager
    manager_data = json.loads(request.body.decode('utf-8'))

    if manager_data:
        lastname = manager_data.get('manager_data', {}).get('lastname')
        firstname = manager_data.get('manager_data', {}).get('firstname')
        email = manager_data.get('manager_data', {}).get('email')
        password = manager_data.get('manager_data', {}).get('password')
        manager_id = manager_data.get('manager_data', {}).get('manager_id')
        encrypted_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        if lastname and firstname and email and password and manager_id:
            new_manager = {
                'lastname': lastname,
                'firstname': firstname,
                'email': email,
                'manager_id': manager_id,
                'password': encrypted_password
            }
            # Insert the new user document into the MongoDB collection
            managers_collection.insert_one(new_manager)
            # Return a success message as a JSON response
            return JsonResponse({"message": "Manager created successfully"})
        else:
            # If any required field is missing, return a bad request response
            return JsonResponse({"error": "Missing required fields"}, status=400)
    else:
        # If no user data is provided, return a bad request response
        return JsonResponse({"error": "No user data provided"}, status=400) 





# def create_user(request):
#     # Extracting data from the request (assuming it's sent as JSON)
#     #user_data = request.POST.get('user_data')  # Assuming user_data is sent in the request
#     user_data = json.loads(request.body.decode('utf-8'))
#     #print(user_data)

#     # Check if user_data is not None
#     if user_data:
        
#         # Extracting user attributes from the user_data
#         lastname = user_data.get('user_data', {}).get('lastname')
#         firstname = user_data.get('user_data', {}).get('firstname')
#         worker_type = user_data.get('user_data', {}).get('worker_type')
#         job_type = user_data.get('user_data', {}).get('job_type')
#         worker_id = user_data.get('user_data', {}).get('worker_id')
#         work_study_hours = user_data.get('user_data', {}).get('hours')
#         email = user_data.get('user_data', {}).get('email')
#         password = user_data.get('user_data', {}).get('password')
#         encrypted_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
#         unavailability = {}

#         scholarship_hours = 0

#         # Check if all required fields are provided
#         if lastname and firstname and worker_type and job_type and worker_id and email and password:
#             # Create a new user document to be inserted into MongoDB
#             if job_type == "Scholarship":
#                 scholarship_hours = SEMESTER_SCHOLARSHIP_HOURS
#                 new_user = {
#                     'lastname': lastname,
#                     'firstname': firstname,
#                     'worker_type': worker_type,
#                     'job_type': job_type,
#                     'worker_id' : worker_id,
#                     'hours' : scholarship_hours,
#                     'email' : email,
#                     'password' : encrypted_password,
#                     'unavailability' : unavailability
#                 }
#             else:
#                 new_user = {
#                     'lastname': lastname,
#                     'firstname': firstname,
#                     'worker_type': worker_type,
#                     'job_type': job_type,
#                     'worker_id' : worker_id,
#                     'hours' : work_study_hours,
#                     'email' : email,
#                     'password' : encrypted_password,
#                     'unavailability' : unavailability
#                 }

#             # Insert the new user document into the MongoDB collection
#             users_collection.insert_one(new_user)
            
#             # Return a success message as a JSON response
#             return JsonResponse({"message": "User created successfully"})
#         else:
#             # If any required field is missing, return a bad request response
#             return JsonResponse({"error": "Missing required fields"}, status=400)
#     else:
#         # If no user data is provided, return a bad request response
#         return JsonResponse({"error": "No user data provided"}, status=400)    

def create_user(request):
    # Extracting data from the request (assuming it's sent as JSON)
    user_data = json.loads(request.body.decode('utf-8'))
    
    # Check if user_data is not None
    if user_data:
        # Extracting user attributes from the user_data
        lastname = user_data.get('user_data', {}).get('lastname')
        firstname = user_data.get('user_data', {}).get('firstname')
        worker_type = user_data.get('user_data', {}).get('worker_type')
        job_type = user_data.get('user_data', {}).get('job_type')
        worker_id = user_data.get('user_data', {}).get('worker_id')
        email = user_data.get('user_data', {}).get('email')
        password = user_data.get('user_data', {}).get('password')
        encrypted_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        unavailability = {}

        # Check if all required fields are provided
        if lastname and firstname and worker_type and job_type and worker_id and email and password:
            # Initialize scheduled hours based on job type
            if job_type == "Scholarship":
                scholarship_hours = managers_collection.find_one({})
                print(scholarship_hours)
                scheduled_hours = scholarship_hours
            else:
                scheduled_hours = user_data.get('user_data', {}).get('hours', 0)

            # Create a new user document to be inserted into MongoDB
            new_user = {
                'lastname': lastname,
                'firstname': firstname,
                'worker_type': worker_type,
                'job_type': job_type,
                'worker_id' : worker_id,
                'scheduled_hours': scheduled_hours,  # Track scheduled hours
                #'worked_hours': 0,  # Initialize worked hours
                'email' : email,
                'password' : encrypted_password,
                'unavailability' : unavailability
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


def delete_user(request):
    # Decode JSON data from the request body
    print(request.body)
    student = json.loads(request.body.decode('utf-8'))
    print(student)
    
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

# def random_scheduler_for_desk_assistant(): 
#     print("DA")

#     # Fetch all workers categorized as Desk assistant
#     desk_assistants = users_collection.find({'job_type': 'Desk worker'})
    
#     big_schedule = {}

#     # Iterate over each day of the week
#     for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']:
#         big_schedule[day] = {}
        
#         # Generate schedule for each time slot of the day
#         start_time = datetime.strptime('08:30', '%H:%M')
#         end_time = datetime.strptime('16:30', '%H:%M')
#         current_time = start_time
        
#         while current_time < end_time:
#             # Initialize list of available desk assistants for the current time slot
#             available_desk_assistants = []
            
#             # Check availability of each desk assistant for the current time slot
#             for desk_assistant in desk_assistants:
#                 # Check if the desk assistant is available at the current time slot on the current day
#                 if current_time.strftime('%H:%M') not in desk_assistant['unavailability'].get(day, []):
#                     available_desk_assistants.append(desk_assistant['firstname'] + ' ' + desk_assistant['lastname'])
                    
#             # Randomly select a desk assistant from the available ones
#             if available_desk_assistants:
#                 selected_desk_assistant = random.choice(available_desk_assistants)
#                 # Assign desk assistant to time slot
#                 big_schedule[day][current_time.strftime('%H:%M')] = selected_desk_assistant
#             else:
#                 big_schedule[day][current_time.strftime('%H:%M')] = 'XXXXX'
            
#             # Move to the next time slot
#             current_time += timedelta(hours=1)
    
#     big_schedule['release']['state'] = False
#     #Empty the schedule colllection
#     schedule.delete_many({})
#     # Insert the new schedule into the schedule collection
#     insertion_result = schedule.insert_one(big_schedule)
#     if big_schedule and insertion_result:
#         return JsonResponse({"message": "Schedule created successfully"})

def generate_da_schedule(request): 
    print("DA")

    # Fetch all workers categorized as Desk assistant
    desk_assistants_query = users_collection.find({'job_type': 'Desk worker'})

    # Iterate over the cursor and print each document
    #for assistant in desk_assistants:
        #print(assistant)

    big_schedule = {}

    # Iterate over each day of the week
    for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']:
        big_schedule[day] = {}
        
        # Generate schedule for each time slot of the day
        start_time = datetime.strptime('08:30', '%H:%M')
        end_time = datetime.strptime('16:30', '%H:%M')
        current_time = start_time
        
        while current_time < end_time:
            desk_assistants = desk_assistants_query.clone()

            # Initialize list of available desk assistants for the current time slot
            available_desk_assistants = []

            # Check availability and remaining scheduled hours of each desk assistant for the current time slot
            #print(desk_assistants)
            for desk_assistant in desk_assistants:
                
              
                #print("Checking availability for:", desk_assistant['firstname'], desk_assistant['lastname'], "at", current_time.strftime('%H:%M'), "on", day)
                # Check if the desk assistant is available at the current time slot on the current day
                if current_time.strftime('%H:%M') not in desk_assistant['unavailability'].get(day, []) and desk_assistant['scheduled_hours'] > 0:
                    #print("Available:", desk_assistant['firstname'], desk_assistant['lastname'])
                    available_desk_assistants.append(desk_assistant)
                else:
                    pass
                    #print("Not available:", desk_assistant['firstname'], desk_assistant['lastname'])

            # Print available desk assistants
            #print("Available desk assistants:", available_desk_assistants)

              
            # Randomly select a desk assistant from the available ones
            if available_desk_assistants:
                #print("Inside second if")
                selected_desk_assistant = random.choice(available_desk_assistants)
                # Assign desk assistant to time slot
                big_schedule[day][current_time.strftime('%H:%M')] = selected_desk_assistant['firstname'] + ' ' + selected_desk_assistant['lastname']
                # Deduct one hour from scheduled hours of the selected desk assistant
                #users_collection.update_one({'_id': selected_desk_assistant['_id']}, {"$inc": {'scheduled_hours': -1}})
            else:
                big_schedule[day][current_time.strftime('%H:%M')] = "XXXXX"
            
            # Move to the next time slot
            current_time += timedelta(hours=1)
            print(current_time)

    
    big_schedule['release'] = {'state': False}  # Add release key to indicate whether the schedule has been released
    #Empty the schedule collection
    schedule.delete_many({})
    # Insert the new schedule into the schedule collection
    insertion_result = schedule.insert_one(big_schedule)
    if big_schedule and insertion_result:
        return JsonResponse({"message": "Schedule created successfully"})

#generate_da_schedule()
   

def release_schedule(request):
    # Find the document in the schedule collection
    schedule_document = schedule.find_one({})
    
    # Check if the document exists
    if schedule_document:
        # Get the big_schedule dictionary from the document
        big_schedule = schedule_document
        
        # Update the value of big_schedule[release][state] to True
        release = 'release'  # Replace 'release' with the actual key for release in your dictionary
        state = 'state'      # Replace 'state' with the actual key for state in your dictionary
        if release in big_schedule and state in big_schedule[release]:
            big_schedule[release][state] = True
            # Update the document in the schedule collection
            schedule.update_one({}, {"$set": big_schedule})
            # schedule_to_be_returned = schedule.find_one({})
            return JsonResponse({"success": True})
        else:
            print("Can't release schedule at the moment, release and state keys not found")
            return JsonResponse({"success": False})
    else:
        print("No schedule found in the schedule collection.")
        return JsonResponse({"success": False})


def get_da_schedule(request):
    release = 'release'  # Replace 'release' with the actual key for release in your dictionary
    state = 'state'
    the_schedule = schedule.find_one({})
    # Convert ObjectId to string
    the_schedule['_id'] = str(the_schedule['_id'])
    if release in the_schedule and state in the_schedule[release]:
        if the_schedule[release][state] == True:
            #schedule_to_be_returned = schedule.find_one({})
            return JsonResponse({"message": "Schedule returned successfully", "schedule": the_schedule})
        else:
            return JsonResponse({"message": "Schedule not ready to be returned"})





def update_unavailability(request): #Here, if worker updated its unavailability, app must check before it generates/copy-paste new schedules (next 2 weeks)
    print("Updating unavailability")
    # Decode JSON data from request body
    print(request)
    data = json.loads(request.body.decode('utf-8'))
    # Extract necessary data
    print(data)
    worker_id = data.get('user_data', {}).get('worker_id')
    unavailability = data.get('user_data', {}).get('unavailability')
    print(worker_id)
    print(unavailability)
    
    # Check if worker_id and unavailability are provided
    if worker_id and unavailability:
        # Find the user by worker_id and update their unavailability
        query = {'_id': ObjectId(str(worker_id))}
        new_values = {'$set': {'unavailability': unavailability}}
        result = users_collection.update_one(query, new_values)
        
        # Return success response
        if result:
            return JsonResponse({"message": "Unavailability updated successfully"})
        else:
            return JsonResponse({"message": "Data received correctly but failure to update user's unavailability"})

    else:
        # Return error response if worker_id or unavailability is missing
        return JsonResponse({"error": "Worker ID or unavailability data missing"}, status=400)


def login(request):
    # Extract email and password from request
    data = json.loads(request.body.decode('utf-8'))
    email = data.get('email')
    password = data.get('password')
    # Check if email and password are provided
    if email and password:
        # Find user by email in the database
        user = users_collection.find_one({'email': email})
        manager = managers_collection.find_one({'email': email})
        
        # If user is found
        if user:
            # Retrieve hashed password from the database
            hashed_password = user.get('password')
            
            # Check if the provided password matches the hashed password
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
                # Return success message upon successful login
                user_id = user.get('_id')
                id = json.loads(json_util.dumps(user_id))
                # token = jwt.encode({'user_id': str(user['_id'])}, 'SECRET_KEY', algorithm='HS256').decode('utf-8')
                
                # # Return the JWT token as a response
                # return JsonResponse({"token": token})
                return JsonResponse({"message": "Login successful", "id": id})
            else:
                # Return error response if password is incorrect
                return JsonResponse({"error": "Incorrect password"}, status=401)
            
        elif manager:
            # Retrieve hashed password from the database
            hashed_password = manager.get('password')
            
            # Check if the provided password matches the hashed password
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
                # Return success message upon successful login
                manager_id = manager.get('_id')
                id = json.loads(json_util.dumps(manager_id))
                # token = jwt.encode({'manager_id': str(manager['_id'])}, 'SECRET_KEY', algorithm='HS256').decode('utf-8')
                
                # # Return the JWT token as a response
                # return JsonResponse({"token": token})
                return JsonResponse({"message": "Login successful", "id": id})
            
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
    semester_scholarship_hours = 0
    semester_scholarship_hours = hours
    # da_scholarship_workers = users_collection.find({'worker_type': 'Scholarship'})
    # for da_scholarship
    insertion_result = managers_collection.insert_one({"scholarship_hours": semester_scholarship_hours})
    if insertion_result:
        return JsonResponse({"message": "Input successful"})
    else:
        return JsonResponse({"message": "Input not succesful"})


def return_workers_info(request):
    #Fetch all workers fro the database
    all_workers = list(users_collection.find())
    
    workers_info = []
    for worker in all_workers:
        worker_info = {
            'worker_id' : worker.get('worker_id'),
            'firstname' : worker.get('firstname'),
            'lastname' : worker.get('lastname'),
            'email' : worker.get('email'),
            'worker_type' : worker.get('worker_type'),
            'job_type' : worker.get('job_type')
            #'unavailability' : worker.get('unavailability')
        }
        workers_info.append(worker_info)
    
    return JsonResponse({'workers':workers_info})
    #print(workers_info)

#return_workers_info()


def give_up_shift(request):
    data = json.loads(request.body.decode('utf-8'))
    worker_id = data.get('worker_id')
    day = data.get('day')
    time_slot = data.get('time_slot')

    if worker_id and day and time_slot:
        # Find the schedule document
        schedule_document = schedule.find_one({})
        
        if schedule_document:
            # Remove the worker from the specified time slot
            schedule_document[day][time_slot] = None
            schedule.update_one({}, {"$set": schedule_document})
            
            # Increase the scheduled hours for the worker
            users_collection.update_one({'worker_id': worker_id}, {"$inc": {'scheduled_hours': 1}})
            
            return JsonResponse({"message": "Shift given up successfully"})
        else:
            return JsonResponse({"error": "No schedule found"}, status=404)
    else:
        return JsonResponse({"error": "Worker ID, day, or time slot missing"}, status=400)

def apply_for_shift(request):
    data = json.loads(request.body.decode('utf-8'))
    worker_id = data.get('worker_id')
    day = data.get('day')
    time_slot = data.get('time_slot')

    if worker_id and day and time_slot:
        # Find the schedule document
        schedule_document = schedule.find_one({})
        
        if schedule_document:
            # Check if the specified time slot is available
            if schedule_document[day][time_slot] == None:
                # Fetch the worker's full name
                worker = users_collection.find_one({'worker_id': worker_id})
                full_name = f"{worker.get('firstname')} {worker.get('lastname')}"
                
                # Assign the shift to the worker
                schedule_document[day][time_slot] = full_name
                schedule.update_one({}, {"$set": schedule_document})
                
                # Decrease the scheduled hours for the worker
                users_collection.update_one({'worker_id': worker_id}, {"$inc": {'scheduled_hours': -1}})
                
                return JsonResponse({"message": "Shift applied successfully"})
            else:
                return JsonResponse({"error": "The specified time slot is not available"}, status=400)
        else:
            return JsonResponse({"error": "No schedule found"}, status=404)
    else:
        return JsonResponse({"error": "Worker ID, day, or time slot missing"}, status=400)

# def generate_mc_schedule():
#     print("MC")
#     # Fetch all workers categorized as Desk assistant
#     mail_clerks = users_collection.find({'job_type': 'Mail Clerk'})
    
#     big_schedule = {}

#     # Iterate over each day of the week
#     for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']:
#         big_schedule[day] = {}
#         #8:30-5, 9-5:30
#         # Generate schedule for each time slot of the day
#         start_time = datetime.strptime('08:30', '%H:%M')
#         end_time = datetime.strptime('16:30', '%H:%M')
#         current_time = start_time
        
#         while current_time < end_time:
#             # Initialize list of available desk assistants for the current time slot
#             available_mail_clerks = []
            
#             # Check availability and remaining scheduled hours of each desk assistant for the current time slot
#             for mail_clerk in mail_clerks:
#                 # Check if the desk assistant is available at the current time slot on the current day
#                 if current_time.strftime('%H:%M') not in mail_clerk['unavailability'].get(day, []) and mail_clerk['scheduled_hours'] > 0:
#                     available_mail_clerks.append(mail_clerk)
                    
#             # Randomly select a desk assistant from the available ones
#             if available_mail_clerks:
#                 selected_mail_clerk = random.choice(available_mail_clerks)
#                 # Assign desk assistant to time slot
#                 big_schedule[day][current_time.strftime('%H:%M')] = selected_mail_clerk['firstname'] + ' ' + selected_mail_clerk['lastname']
#                 # Deduct one hour from scheduled hours of the selected desk assistant
#                 users_collection.update_one({'_id': selected_mail_clerk['_id']}, {"$inc": {'scheduled_hours': -1}})
#             else:
#                 big_schedule[day][current_time.strftime('%H:%M')] = None
            
#             # Move to the next time slot
#             current_time += timedelta(hours=1)
