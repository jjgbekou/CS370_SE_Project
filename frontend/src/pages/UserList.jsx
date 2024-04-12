import { getAllUsers } from "../data/api"
import { useEffect, useState } from "react"

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

    let user = JSON.parse(sessionStorage.getItem("User"))
    let userView = user.view == "Manager"

    /*useEffect(() => {
        async function loadUsers() {
            let data = await getAllUsers()
            setUsers(data)
        }
        loadUsers()
    }, [])*/

    return (
        <div className="flex justify-center items-center w-full">
            {userView 
            ?
            <div className="flex w-1/2">  
                <table className="min-w-full divide-y justify-center divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-truman-purple uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-truman-purple uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-truman-purple uppercase tracking-wider">Job Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-truman-purple uppercase tracking-wider">Worker Type</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-truman-purple">
                    {users.map(user => (
                    <tr key={user.email}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.job_type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.worker_type}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            :
            <h1>You do not have permission to access this page</h1>
            }
        </div>
    )
}