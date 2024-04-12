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
            let loginObject = {email: email, password: password}
            let loginResponse = await verifyUser(loginObject)
            let loginSuccessful = loginResponse.success
            let loginView = loginResponse.view

            if (!loginSuccessful) {
                alert("Login information incorrect")
                return
            }

            let id = loginResponse.id
            let stringId = id[`$oid`]
            let view = loginResponse.view
            let userObject = JSON.stringify({userId: stringId, view: view})
            sessionStorage.setItem("User", userObject)
            navigate("/home")
        } catch (e) {
            console.log(`Error happened during login: ${e}`)
        }
    }

    return (
        <form onSubmit={(e) => handleLogin(e)} className="flex flex-col">
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Truman Email" className="m-2 p-2 rounded-md" required/>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="m-2 p-2 rounded-md" required/>
            <button type="submit" className="bg-truman-purple">Login</button>
        </form>
    )   
}