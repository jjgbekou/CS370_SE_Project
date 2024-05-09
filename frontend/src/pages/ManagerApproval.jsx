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
        <div className="flex flex-col mt-24 w-86">
            <p className="mb-12 text-xl font-bold">Here is where administrators can confirm manager applications. Only confirm a manager if you are certain they have valid credentials.</p>
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