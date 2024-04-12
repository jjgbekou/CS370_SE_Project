import { BigSchedule } from "../components/BigSchedule"
import { useEffect, useState } from "react"

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

    useEffect(() => {

    }, [])

    return (
        <div className="flex w-full justify-center">
            <BigSchedule schedule={schedule}/>
        </div>
    )
}