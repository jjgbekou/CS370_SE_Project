import { MySchedule } from "../components/MySchedule"
import { useParams } from "react-router-dom"

export function Profile() {
    let params = useParams()
    let userId = params.id

    return (
        <div className='flex w-full justify-center'>
            <MySchedule userId={userId}/>
        </div>
    )
}