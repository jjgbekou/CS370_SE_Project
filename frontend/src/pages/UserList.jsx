import { getAllUsers } from "../data/api"
import { useEffect, useState } from "react"
import { deleteUser } from "../data/api";
import { Loading } from "../components/Loading";

export function UserList() {

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

    async function handleDelete(user) {
        await deleteUser(user.worker_id)
    }

    return (
        <>
        {!loading ?
        
        <div className="flex justify-center items-center w-full">
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
                        <td onClick={() => handleDelete(user)} className="cursor-pointer">Remove</td>
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
        </>
    )
}