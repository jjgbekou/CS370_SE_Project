import { generateDaSchedule } from "../data/api"
import { releaseSchedule } from "../data/api"

export function Manager() {

    async function genSchedule() {
        await generateDaSchedule()
    }

    async function relSchedule() {
        await releaseSchedule()
    }

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col justify-center">
                <button onClick={genSchedule} className="m-2 p-2 font-bold w-48 bg-truman-purple">Generate Schedule</button>
                <button onClick={relSchedule} className="m-2 p-2 font-bold w-48 bg-truman-purple">Release Schedule</button>
            </div>
        </div>
    )
}