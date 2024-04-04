import { verifyUser } from "../data/api"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function Login() {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            let userObject = {email: email, password: password}
            let loginSuccessful = await verifyUser(userObject)

            if (!loginSuccessful) {
                alert("Login information incorrect")
                return
            }

            //Store user obj in session storage to validate 
            //sessionStorage.setItem()
            navigate("/home")
        } catch (e) {
            console.log(`Error happened during login: ${e}`)
        }
    }

    return (
        <form onSubmit={(e) => handleLogin(e)} className="flex flex-col">
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Truman Email" className="m-2 p-2 rounded-md" required/>
            <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="m-2 p-2 rounded-md" required/>
            <button type="submit" className="bg-purple-400">Login</button>
        </form>
    )   
}