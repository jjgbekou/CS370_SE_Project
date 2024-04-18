import { useEffect, useState } from "react"
import { getUnapprovedManagers } from "../data/api"
import { ManagerCard } from "../components/ManagerCard"

export function ManagerApproval() {

    const [managers, setManagers] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        async function loadManagers() {
            let data = await getUnapprovedManagers()
            console.log(data)
            setManagers(data.data.managers)
        }
        loadManagers()
    }, [])

    return (
        <>
        <div className="flex flex-col w-screen justify-center">
        <p className="w-64 mb-12">Here is where administrators can confirm manager applications. Only confirm a manager if you are certain they have valid credentials.</p>
        {managers.map((manager) => {
            return (
                <>
                    <ManagerCard manager={manager} setRefresh={setRefresh}/>
                </>
            )
        })}
        </div>
        </>
    )
}