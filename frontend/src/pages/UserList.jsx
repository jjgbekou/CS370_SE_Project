import { getAllUsers } from "../data/api"
import { useEffect, useState } from "react"
import { deleteUser } from "../data/api";
import { Loading } from "../components/Loading";
import { ConfirmationModal } from "../components/ConfirmationModal";

export function UserList() {

    const [isOpen, setIsOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [users, setUsers] = useState([
        {
          name: 'John Doe',
          email: 'john@example.com',
          job_type: 'Developer',
          worker_type: 'Full-time',
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          job_type: 'Designer',
          worker_type: 'Part-time',
        },
        {
          name: 'Alice Johnson',
          email: 'alice@example.com',
          job_type: 'Manager',
          worker_type: 'Full-time',
        },
      ]);

    const [loading, setLoading] = useState(true)
    
      function openModal(user) {
        setIsOpen(true)
        setDeleteId(user.worker_id)
      }

    let user = JSON.parse(sessionStorage.getItem("User"))
    let userView = user.view == "Manager"

    useEffect(() => {
        async function loadUsers() {
            let data = await getAllUsers()
            console.log(data)
            setUsers(data.data.workers)
            setLoading(false)
        }
        loadUsers()
    }, [])

    async function handleDelete() {
        await deleteUser(deleteId)
    }

    return (
        <>
        {!loading ?
        
        <div className="flex justify-center items-center w-full mt-32">
            {userView 
            ?
            <div className="flex justify-center w-1/2">  
                <table className="min-w-full divide-y justify-center divide-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white bg-blue-500 uppercase tracking-wider">First Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white bg-blue-500 uppercase tracking-wider">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white bg-blue-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white bg-blue-500 uppercase tracking-wider">Job Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white bg-blue-500 uppercase tracking-wider">Worker Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white bg-blue-500 uppercase tracking-wider">Remove User?</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-truman-purple">
                    {users.map(user => (
                    <tr key={user.email}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.firstname}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.lastname}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.job_type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.worker_type}</td>
                        <td onClick={() => openModal(user)} className="cursor-pointer">Remove</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            :
            <h1>You do not have permission to access this page</h1>
            }
        </div>
        :
        <Loading/>}
        <ConfirmationModal title={"Are you sure?"} message={"This will remove the user from the active database. If you are prepared to terminate this user, press confirm. Otherwise, cancel."} buttonCancel={"Cancel"} buttonConfirm={"Confirm"} isOpen={isOpen} setIsOpen={setIsOpen} confirmationFunction={handleDelete} confirmationParams={deleteId}/>
        </>
    )
}