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
            <div className="flex flex-col w-72">
                <Login/>
                <span onClick={() => setMode(false)} className="flex cursor-pointer rounded-md p-1 justify-center bg-truman-purple text-sm mt-2">Create New User</span>
            </div>
            :
            <div>
                <CreateUser setMode={setMode}/>
                <span onClick={() => setMode(true)} className="flex cursor-pointer rounded-md p-1 justify-center bg-truman-purple text-sm mt-2">Login Existing Account</span>
            </div>}
        </div>
    )
}