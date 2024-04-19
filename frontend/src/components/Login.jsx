import { verifyUser } from "../data/api"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { AlertModal } from "./AlertModal"

export function Login() {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [nfModal, setNfModal] = useState(false)
    const [unModal, setUnModal] = useState(false)
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        
        let loginObject = {email: email, password: password}
        let loginResponse = await verifyUser(loginObject)
        let loginSuccessful = loginResponse.success
        let loginView = loginResponse.view
        console.log(loginResponse)

        if (loginResponse.status === 404) {
            openNotFoundModal()
        } else if (loginResponse.status === 401) {
            openUnauthorizedModal()
        }

        let id = loginResponse.id
        let stringId = id[`$oid`]
        let view = loginResponse.view
        let userObject = JSON.stringify({userId: stringId, view: view})
        sessionStorage.setItem("User", userObject)
        navigate("/home")
        
    }

    function openNotFoundModal() {
        setNfModal(true)
    }

    function openUnauthorizedModal() {
        setUnModal(true)
    }

    return (
        <>
        <form onSubmit={(e) => handleLogin(e)} className="flex flex-col">
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Truman Email" className="m-2 p-2 rounded-md" required/>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="m-2 p-2 rounded-md" required/>
            <button type="submit" className="bg-truman-purple">Login</button>
        </form>
        {nfModal && <AlertModal title={"Invalid Email"} message={"The email you entered in does not belong to any registered account. If you need to create a new account, please do so."} button={"Okay"} isOpen={nfModal} setIsOpen={setNfModal}/>}
        {unModal && <AlertModal title={"Incorrect Password"} message={"The email you entered in was valid, but the password was not correct. Please try again."} button={"Okay"} isOpen={unModal} setIsOpen={setUnModal}/>}
        </>
    )   
}