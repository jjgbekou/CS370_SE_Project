import { BigSchedule } from "../components/BigSchedule"
import { useEffect, useState } from "react"
import { generateDaSchedule, getDaSchedule } from "../data/api"
import { DaSchedule } from "../components/DaSchedule"
import { Loading } from "../components/Loading"

export function Home() {

    const [schedule, setSchedule] = useState({
        Monday: {
          '8:30': 'John Doe',
          '9:00': 'Jane Smith',
          '12:00': 'Alice',
          '16:00': 'Bob'
        },
        Tuesday: {
          '10:00': 'John Doe',
          '12:30': 'Alice',
          '16:00': 'Jane Smith'
        },
      })

      const [realSchedule, setRealSchedule] = useState({})
      const [loading, setLoading] = useState(true)

    useEffect(() => {
      async function loadSchedule() {
        let data = await getDaSchedule()
        console.log(data)
        setRealSchedule(data.data.schedule)
        setLoading(false)
      }
      loadSchedule()
    }, [])

    return (
      <>
        {!loading ? 
        <div className="flex w-full justify-center">
            <DaSchedule schedule={realSchedule}/>
            
        </div>
        :
        <Loading/>
        }
      </>
    )
}