import { generateDaSchedule } from "../data/api"
import { releaseSchedule } from "../data/api"
import { inputScholarshipHours } from "../data/api"
import { useState } from "react"

export function Manager() {

    const [hours, setHours] = useState(51)

    async function genSchedule() {
        await generateDaSchedule()
    }

    async function relSchedule() {
        await releaseSchedule()
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await inputScholarshipHours(hours)
    }

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col justify-center">
                <button onClick={genSchedule} className="m-2 p-2 font-bold w-48 bg-blue-500">Generate Schedule</button>
                <button onClick={relSchedule} className="m-2 p-2 font-bold w-48 bg-blue-500">Release Schedule</button>
                <form className="flex flex-col mt-4" onSubmit={(e) => handleSubmit(e)}>
                    <input className="p-2 rounded-md" onChange={(e) => setHours(e.target.value)} placeholder={"Scholarship Hours"}/>
                    <button className="bg-blue-500 rounded-md mt-2 font-bold p-2" type="submit">Submit Hours</button>
                </form>
            </div>
        </div>
    )
}