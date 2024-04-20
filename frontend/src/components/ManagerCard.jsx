import { approveManager } from "../data/api";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";

export function ManagerCard( {manager, setRefresh} ) {
    const [isOpen, setIsOpen] = useState(false)
    console.log(manager)

    function handleClick(manager) {
        openModal()
    }

    async function handleApproval() {
        let data = await approveManager(manager._id)
        console.log(data)
    }

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    return (
        <>
        <div className=" flex flex-col bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-lg text-black font-semibold mb-2">{`${manager.firstname} ${manager.lastname}`}</h2>
            <p className="text-gray-600 mb-2">Email: {manager.email}</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                onClick={handleClick}
            >
            Confirm
        </button>
        </div>
        {isOpen && <ConfirmationModal title={"Confirm this manager?"} message={"Managers have the power to change the schedule. Only confirm a manager if you are certain of their credentials."} buttonCancel={"Cancel"} buttonConfirm={"Confirm"} isOpen={isOpen} setIsOpen={setIsOpen} confirmationFunction={handleApproval} confirmationParams={manager._id} setRefresh={setRefresh} closeModal={closeModal}/>}
        </>
    )
}