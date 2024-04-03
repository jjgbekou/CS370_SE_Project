import { useState } from "react"
import { Login } from "../components/Login"
import { CreateUser } from "../components/CreateUser"

export function Landing() {
    // Mode == true means login mode,
    // Mode == false means create account mode
    const [mode, setMode] = useState(true)

    return (
        <>
            {mode ? <Login/> : <CreateUser/>}
        </>
    )
}