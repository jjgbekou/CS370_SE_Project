import axios from "axios"
const BASE_URL = "http://localhost:8000"

export async function getUser(userId) {
    let data = axios.get()
}

export async function updateUserAvailability(userObject) {
    try {
        let data = axios.put(`${BASE_URL}/update_unavailability/`, {user_data: userObject})
        return data
    } catch (error) {
        console.log(`Error occured during creation: ${error}`)
    }
    
}

export async function verifyUser(userObject) {
    try {
        let data = await axios.post(`${BASE_URL}/login/`, userObject)
        if (data.status === 200) {
            let user_id = data.data.id
            let view = data.data.isManager ? "Manager" : "User"
            
            return {
                id: user_id,
                view: view,
                success: true
            }
        } else {
            return {
                success: false
            }
        }
    } catch(error) {
        console.log(`Login could not be validated: ${error}`)
    }
}

export async function getAllUsers() {
    try {
        let data = axios.get(`${BASE_URL}/return_workers_info/`)
        return data
    } catch(error) {
        console.log(`Error occured while fetching all users: ${error}`)
    }

}

export async function createUser(userObject) {
    try {
        let data = await axios.post(`${BASE_URL}/create_user/`, {user_data: userObject})
        console.log(data)
    } catch(error) {
        console.log(`Error occured during creation: ${error}`)
    }
    
    return data
}

export async function updateUser(userId, userObject) {
    let data = axios.put()
}

export async function deleteUser(userId) {
    try {
        let data = axios.delete(`${BASE_URL}/delete_user/${userId}`)
        return data
    } catch(error) {
        console.log(`Error occured during deletion: ${error}`)
    }
}

export async function generateDaSchedule() {
    try {
        let data = axios.post(`${BASE_URL}/generate_da_schedule/`)
        return data
    } catch(error) {
        console.log(`Schedule could not be generated: ${error}`)
    }
}

export async function getDaSchedule() {
    try {
        let data = await axios.get(`${BASE_URL}/get_da_schedule/`)
        return data
    } catch(error) {
        console.log(`Schedule could not be retrieved: ${error}`)
    }

}

export async function releaseSchedule() {
    try {
        let data = axios.put(`${BASE_URL}/release_schedule/`)
        return data
    } catch(error) {
        console.log(`Error releasing schedule: ${error}`)
    }
}

export async function updateSchedule(scheduleId) {
    try {
        let data = axios.put()
    } catch(error) {
        console.log(`Error while updating schedule: ${error}`)
    }
}