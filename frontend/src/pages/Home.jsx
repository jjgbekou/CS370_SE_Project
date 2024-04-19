import { BigSchedule } from "../components/BigSchedule"
import { useEffect, useState } from "react"
import { generateDaSchedule, getDaSchedule } from "../data/api"
import { DaSchedule } from "../components/DaSchedule"
import { Loading } from "../components/Loading"

export function Home() {

    const [refresh, setRefresh] = useState(false)
    const [schedule, setSchedule] = useState({})
    const [loading, setLoading] = useState(true)
    const [released, setReleased] = useState(false)

    const user = JSON.parse(sessionStorage.getItem("User"))
    const userId = user.userId

    useEffect(() => {
      async function loadSchedule() {
        let data = await getDaSchedule()
        console.log(data)
        let sched = data.data.schedule
        setSchedule(sched)
        setLoading(false)
        if (sched?.release?.state) {
          setReleased(true)
        }
      }
      loadSchedule()
      console.log("Hehe xd")
    }, [refresh])



    return (
      <>
        {released ? <>
        {!loading ? 
        <div className="flex w-full justify-center">
            <DaSchedule schedule={schedule} userId={userId} setRefresh={setRefresh}/>
        </div>
        :
        <Loading/>
        }</>
        :
        <div className="flex flex-col w-screen h-screen justify-center">
          <span className="flex justify-center text-8xl mb-16"> :(</span>
          <span className="flex justify-center text-3xl">Schedule has not been released by a manager yet</span>
        </div>
      }
      </>
    )
}