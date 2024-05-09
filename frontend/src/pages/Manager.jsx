import { ConfirmationModal } from "../components/ConfirmationModal"
import { generateDaSchedule } from "../data/api"
import { releaseSchedule } from "../data/api"
import { inputScholarshipHours } from "../data/api"
import { useState } from "react"

export function Manager() {

    const [hours, setHours] = useState(51)
    const [genIsOpen, setGenIsOpen] = useState(false)
    const [relIsOpen, setRelIsOpen] = useState(false)
    const [hoursIsOpen, setHoursIsOpen] = useState(false)

    async function genSchedule() {
        await generateDaSchedule()
    }

    async function relSchedule() {
        await releaseSchedule()
    }

    async function handleSubmit() {
        await inputScholarshipHours(hours)
    }

    function openGenModal() {
        setGenIsOpen(true)
    }

    function openRelModal() {
        setRelIsOpen(true)
    }

    function openHoursModal(e) {
        e.preventDefault()
        setHoursIsOpen(true)
    }

    function closeGenModal() {
        setGenIsOpen(false)
    }

    function closeRelModal() {
        setRelIsOpen(false)
    }

    function closeHoursModal(e) {
        e.preventDefault()
        setHoursIsOpen(false)
    }

    return (
        <>
        <div className="flex justify-center w-full mb-48">
            <div className="flex flex-col justify-center">
                <button onClick={openGenModal} className="m-2 p-2 font-bold w-48 bg-blue-500">Generate Schedule</button>
                <button onClick={openRelModal} className="m-2 p-2 font-bold w-48 bg-blue-500">Release Schedule</button>
                <form className="flex flex-col mt-4" onSubmit={openHoursModal}>
                    <input className="p-2 rounded-md" onChange={(e) => setHours(e.target.value)} placeholder={"Scholarship Hours"}/>
                    <button className="bg-blue-500 rounded-md mt-2 font-bold p-2" type="submit">Submit Hours</button>
                </form>
            </div>
        </div>
        {genIsOpen && <ConfirmationModal title={"Are you sure?"} message={"This will generate a new schedule in the database and completely erase the previous one. If you are ready to do that, press confirm. Otherwise, cancel."} buttonCancel={"Cancel"} buttonConfirm={"Confirm"} isOpen={genIsOpen} setIsOpen={setGenIsOpen} confirmationFunction={genSchedule} confirmationParams={null} closeModal={closeGenModal}/>}
        {relIsOpen && <ConfirmationModal title={"Are you sure?"} message={"This will release the current iteration of the schedule to the users. If you are ready for the users to see a new schedule, press confirm. Otherwise, cancel."} buttonCancel={"Cancel"} buttonConfirm={"Confirm"} isOpen={relIsOpen} setIsOpen={setRelIsOpen} confirmationFunction={relSchedule} confirmationParams={null} closeModal={closeRelModal}/>}
        {hoursIsOpen && <ConfirmationModal title={"Are you sure?"} message={"Updating scholarship hours will change the hour requirement of every scholarship worker in the database. If you are ready to change all user's hours, press confirm. Otherwise, cancel."} buttonCancel={"Cancel"} buttonConfirm={"Confirm"} isOpen={hoursIsOpen} setIsOpen={setHoursIsOpen} confirmationFunction={handleSubmit} confirmationParams={hours} closeModal={closeHoursModal}/>}
        </>
    )
}