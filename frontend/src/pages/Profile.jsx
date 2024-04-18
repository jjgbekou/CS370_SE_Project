import { MySchedule } from "../components/MySchedule"

export function Profile() {

    let user = JSON.parse(sessionStorage.getItem("User"))
    let userId = user.userId

    return (
        <>
            <MySchedule userId={userId}/>
        </>
    )
}