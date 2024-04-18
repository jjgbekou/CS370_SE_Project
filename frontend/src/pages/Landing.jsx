import { useState } from "react"
import { Login } from "../components/Login"
import { CreateUser } from "../components/CreateUser"

export function Landing() {
    // Mode == true means login mode,
    // Mode == false means create account mode
    const [mode, setMode] = useState(true)

    return (
        <div className="flex content-center justify-items-center justify-center w-screen h-screen">
            <div className="w-1/2 bg-truman-purple rounded-lg ml-4 flex flex-col justify-center items-center p-8">
                {/* Text or other content for the other side of the screen */}
                <h1 className="text-5xl font-bold mb-4 text-white">Welcome to TruFlow</h1>
                <p className="text-lg text-white mb-2 italic">Scheduling Built Around Simplicity</p>
                <p className="text-lg text-white mb-2 italic">Sign in to get started!</p>
            </div>
            <div className="flex w-1/2 justify-center">
            {mode ? 
            <div className="flex flex-col justify-center w-72">
                <Login/>
                <span onClick={() => setMode(false)} className="flex cursor-pointer rounded-md p-1 justify-center bg-truman-purple text-sm mt-2">Create New User</span>
            </div>
            :
            <div className="mt-8">
                <CreateUser setMode={setMode}/>
                <span onClick={() => setMode(true)} className="flex cursor-pointer rounded-md p-1 justify-center bg-truman-purple text-sm mt-2">Login Existing Account</span>
            </div>}
            </div>
        </div>
    )
}