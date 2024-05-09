import { useEffect, useState } from "react"
import { deleteUser } from "../data/api";
import { Loading } from "../components/Loading";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { getAllManagers } from "../data/api";

export function ManagerList() {

    const [isOpen, setIsOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [managers, setManagers] = useState()

    const [loading, setLoading] = useState(true)
    
      function openModal(user) {
        setIsOpen(true)
        setDeleteId(user.worker_id)
      }

      function closeModal() {
        setIsOpen(false)
      }

    let user = JSON.parse(sessionStorage.getItem("User"))

    useEffect(() => {
        async function loadManagers() {
            let data = await getAllManagers()
            console.log(data)
            setManagers(data.data.workers)
            setLoading(false)
        }
        loadManagers()
    }, [])

    async function handleDelete() {
        await deleteUser(deleteId)
    }

    return (
        <>
        {!loading ?
        
        <div className="flex justify-center mt-12 w-full h-auto">
            <div className="flex justify-center w-1/2 h-1/4 mb-24">  
                <table className="min-w-full divide-y justify-center divide-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white bg-blue-500 uppercase tracking-wider">First Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white bg-blue-500 uppercase tracking-wider">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white bg-blue-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white bg-blue-500 uppercase tracking-wider">Remove Manager?</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-truman-purple">
                    {managers.map(user => (
                    <tr key={user.email}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.firstname}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.lastname}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td onClick={() => openModal(user)} className="cursor-pointer">Remove</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
        :
        <Loading/>}
        <ConfirmationModal title={"Are you sure?"} message={"This will remove the manager from the active database. If you are prepared to terminate this manager, press confirm. Otherwise, cancel."} buttonCancel={"Cancel"} buttonConfirm={"Confirm"} isOpen={isOpen} setIsOpen={setIsOpen} confirmationFunction={handleDelete} confirmationParams={deleteId} closeModal={closeModal}/>
        </>
    )
}