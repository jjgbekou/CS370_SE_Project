import { Navbar } from "./Navbar"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function Layout() {

    const navigate = useNavigate()
    let user = sessionStorage.getItem("User")

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}