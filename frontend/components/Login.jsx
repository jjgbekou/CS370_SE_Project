import { verifyUser } from "../data/api"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function Login() {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        if (!email || !password) {
            alert("Both fields must be filled out")
            return
        }
        let userObject = {email: email, password: password}

        let loginSuccessful = await verifyUser(userObject)

        if (!loginSuccessful) {
            alert("Login information incorrect")
            return
        }
        //Store user obj in session storage to validate 
        //sessionStorage.setItem()
        navigate("/home")
    }

    return (
        <>
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Truman Email"/>
            <input onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            <button onClick={(e) => handleLogin(e)}>Login</button>
        </>
    )   
}