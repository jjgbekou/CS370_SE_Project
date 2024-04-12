import { useState } from "react"
import { Login } from "../components/Login"
import { CreateUser } from "../components/CreateUser"

export function Landing() {
    // Mode == true means login mode,
    // Mode == false means create account mode
    const [mode, setMode] = useState(true)

    return (
        <div className="flex content-center justify-items-center justify-center w-screen">
            {mode ? 
            <>
                <Login/>
                <span onClick={() => setMode(false)} className="cursor-pointer text-sm my-7">Create New User</span>
            </>
            :
            <>
                <CreateUser/>
                <span onClick={() => setMode(true)} className="cursor-pointer text-sm my-7">Login Existing Account</span>
            </>}
        </div>
    )
}