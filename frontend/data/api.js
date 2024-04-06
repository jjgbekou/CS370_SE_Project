import axios from "axios"
const BASE_URL = "http://localhost:8000"

export async function getUser(userId) {
    let data = axios.get()
}

export async function updateUserAvailability(userObject) {
    try {
        let data = axios.get(`${BASE_URL}/update_unavailability/`, {user_data: userObject})
        return data
    } catch (error) {
        console.log(`Error occured during creation: ${error}`)
    }
    
}

export async function verifyUser(userObject) {
    let data = await axios.post(`${BASE_URL}/login/`, userObject)
    if (data.status === 200) {
        return {
            id: data.data.id,
            success: true
        }
    } else {
        return {
            success: false
        }
    }
}

export async function getAllUsers() {
    let data = axios.get()
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
    let data = axios.delete()
}

export async function generateSchedule() {
    let data = axios.post()
}

export async function updateSchedule(scheduleId) {
    let data = axios.put()
}