import { BigSchedule } from "../components/BigSchedule"
import { useEffect, useState } from "react"
import { generateDaSchedule, getDaSchedule } from "../data/api"
import { DaSchedule } from "../components/DaSchedule"
import { Loading } from "../components/Loading"

export function Home() {

    const [refresh, setRefresh] = useState(false)
    const [schedule, setSchedule] = useState({})
    const [loading, setLoading] = useState(true)

    const user = JSON.parse(sessionStorage.getItem("User"))
    const userId = user.userId

    useEffect(() => {
      async function loadSchedule() {
        let data = await getDaSchedule()
        console.log(data)
        setSchedule(data.data.schedule)
        setLoading(false)
      }
      loadSchedule()
    }, [refresh])

    return (
      <>
        {!loading ? 
        <div className="flex w-full justify-center">
            <DaSchedule schedule={schedule} userId={userId} setRefresh={setRefresh}/>
            
        </div>
        :
        <Loading/>
        }
      </>
    )
}