import axios from "axios"
const BASE_URL = "http://localhost:8000"

export async function getUser(userId) {
    let data = axios.get()
}

export async function getAllUsers() {
    let data = axios.get()
}

export async function createUser(userObject) {
    let data = axios.post()
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