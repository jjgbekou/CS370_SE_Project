import { useState } from "react"
import { Login } from "../components/Login"
import { CreateUser } from "../components/CreateUser"
import { ManagerApplication } from "../components/ManagerApplication"

export function Landing() {
    const [mode, setMode] = useState("Login")

    return (
        <div className="flex content-center justify-items-center justify-center w-screen h-screen">
            <div className="w-1/2 bg-truman-purple rounded-lg ml-4 flex flex-col justify-center items-center p-8">
                {/* Text or other content for the other side of the screen */}
                <h1 className="text-5xl font-bold mb-4 text-white">Welcome to TruFlow</h1>
                <p className="text-lg text-white mb-2 italic">Scheduling Built Around Simplicity</p>
                <p className="text-lg text-white mb-2 italic">Sign in to get started!</p>
            </div>
            <div className="flex w-1/2 justify-center">
            {mode == "Login" &&
            <div className="flex flex-col justify-center w-72">
                <Login/>
                <span onClick={() => setMode("Create")} className="flex cursor-pointer rounded-md p-1 justify-center  text-sm mt-2">Create New User</span>
                <span onClick={() => setMode("Manager")} className="flex cursor-pointer rounded-md p-1 justify-center  text-sm mt-2">Manager Application</span>
            </div>}
            {mode === "Create" &&
            <div className="flex flex-col justify-center mt-8">
                <CreateUser setMode={setMode}/>
                <span onClick={() => setMode("Login")} className="flex cursor-pointer rounded-md p-1 justify-center  text-sm mt-2">Login Existing Account</span>
                <span onClick={() => setMode("Manager")} className="flex cursor-pointer rounded-md p-1 justify-center  text-sm mt-2">Manager Application</span>
            </div>}
            {mode === "Manager" && 
            <div className="flex flex-col justify-center mt-8">
                <ManagerApplication setMode={setMode}/>
                <span onClick={() => setMode("Login")} className="flex cursor-pointer rounded-md p-1 justify-center text-sm mt-2">Login Existing Account</span>
                <span onClick={() => setMode("Create")} className="flex cursor-pointer rounded-md p-1 justify-center text-sm mt-2">Create New User</span>
            </div>
            }
            </div>
        </div>
    )
}