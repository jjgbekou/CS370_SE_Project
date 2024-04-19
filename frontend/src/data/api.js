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
    let data
    try {
        let data = await axios.post(`${BASE_URL}/login/`, userObject)
        if (data.status === 200) {
            let user_id = data.data.id
            //let view = data.data.isManager ? "Manager" : "User"
            
            return {
                id: user_id,
                view: data.data.view,
                success: true,
                status: data.status
            }
        }} catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    return {
                        success: false,
                        status: 404
                    }
                } else if (error.response.status === 401) {
                    return {
                        success: false,
                        status: 401
                    }
                } else {
                    return {
                        success: false,
                        status: 400
                    }
                }
            }
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
    let data
    try {
        data = await axios.post(`${BASE_URL}/create_user/`, {user_data: userObject})
        console.log(data)
    } catch(error) {
        console.log(`Error occured during creation: ${error}`)
    } finally {
        return data
    }
}

export async function createManager(managerObject) {
    let data
    try {
        data = await axios.post(`${BASE_URL}/create_manager/`, {manager_data: managerObject})
        console.log(data)
    } catch(error) {
        console.log(`Error occured during creation: ${error}`)
    } finally {
        return data
    }
}

export async function updateUser(userId, userObject) {
    let data = axios.put()
}

export async function deleteUser(userId) {
    try {
        let data = axios.post(`${BASE_URL}/delete_user/`, {worker_id: userId})
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

export async function giveUpShift(userObject) {
    console.log(userObject)
    try {
        let data = axios.put(`${BASE_URL}/give_up_shift/`, {time_slot : userObject.time_slot, worker_id : userObject.worker_id, day: userObject.day})
        return data
    } catch(error) {
        console.log(`Error giving up shift: ${error}`)
    }
}

export async function applyForShift(userObject) {
    console.log(userObject)
    try {
        let data = axios.put(`${BASE_URL}/apply_for_shift/`, {time_slot : userObject.time_slot, worker_id : userObject.worker_id, day: userObject.day})
        return data
    } catch(error) {
        console.log(`Error applying for shift: ${error}`)
    }
}

export async function inputScholarshipHours(hours) {
    try {
        let data = axios.put(`${BASE_URL}/get_scholarship_hours/`, hours)
    } catch(error) {
        console.log(`Error while inputting scholarship hours: ${error}`)
    }
}

export async function getUnapprovedManagers() {
    try {
        let data = axios.get(`${BASE_URL}/return_unapproved_managers_to_admin/`)
        return data
    } catch(error) {
        console.log(`Error occured while fetching all users: ${error}`)
    }
}

export async function approveManager(managerId) {
    console.log(managerId)
    try {
        let data = axios.put(`${BASE_URL}/approve_manager/`, {manager_id: managerId})
        return data
    } catch(error) {
        console.log(`Error occured while approving manager: ${error}`)
    }
}