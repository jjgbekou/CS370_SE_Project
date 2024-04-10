import { getAllUsers } from "../data/api"
import { useEffect } from "react"

export function UserList() {

    let user = JSON.parse(sessionStorage.getItem("User"))
    let userView = user.view == "Manager"

    return (
        <>
            {userView 
            ?
            <h1>User List page</h1>
            :
            <h1>You do not have permission to access this page</h1>
            }
        </>
    )
}