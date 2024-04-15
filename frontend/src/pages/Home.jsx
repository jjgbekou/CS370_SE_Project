import { BigSchedule } from "../components/BigSchedule"
import { useEffect, useState } from "react"
import { generateDaSchedule, getDaSchedule } from "../data/api"

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

    useEffect(() => {
      async function loadSchedule() {
        let data = await getDaSchedule()
        console.log(data)
        setRealSchedule(data.data.schedule)
      }
      loadSchedule()
    }, [])

    return (
      <>
      
        <div className="flex w-full justify-center">
            <BigSchedule schedule={realSchedule}/>
            
        </div>
        

      </>
    )
}