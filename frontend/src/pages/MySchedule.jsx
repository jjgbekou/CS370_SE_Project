import { getUser } from "../data/api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export function MySchedule() {

    let params = useParams()
    let id = params.id

    const [user, setUser] = useState({})

    useEffect(() => {
        async function getUserData() {
            let data = await getUser(id)
            setUser(data)
        }
        getUserData()
    }, [])

    return (
        <>
            {JSON.stringify(user)}
        </>
    )
}