import { createUser } from "../data/api"
import { useState } from "react"

export function CreateUser() {

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        worker_id: '',
        job_type: '',
        worker_type: '',
        email: '',
        password: '',
        hours: 0
      });

      const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    async function handleSubmit(e) {
        e.preventDefault()
        try {
          const response = await createUser(user)
          console.log(response.data); 
        } catch (error) {
          alert('Error creating user:', error);
        }
      };

    return (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input type="text" name="lastname" placeholder="Last Name" value={user.lastname} onChange={handleChange} className="m-2 p-2 rounded-md" required />
            <input type="text" name="firstname" placeholder="First Name" value={user.firstname} onChange={handleChange}className="m-2 p-2 rounded-md" required />
            <input type="text" name="worker_id" placeholder="Worker ID" value={user.worker_id} onChange={handleChange} className="m-2 p-2 rounded-md" maxLength={9} required />
            <select name="worker_type" value={user.worker_type} onChange={handleChange}  className="m-2 p-2 rounded-md" required>
              <option value="">Select Worker Type</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Work-Study">Work-Study</option>
            </select>
            {user.worker_type === 'Work-Study' && ( // Show hours field only if worker type is 'Work-Study'
              <input type="number" name="hours" placeholder="Number of Hours" value={user.hours} onChange={handleChange} required />
            )}
            <select name="job_type" value={user.job_type} onChange={handleChange} className="m-2 p-2 rounded-md" required>
              <option value="">Select Job Type</option>
              <option value="Desk worker">Desk Worker</option>
              <option value="Mail Clerk">Mail Clerk</option>
            </select>
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="m-2 p-2 rounded-md" required />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} className="m-2 p-2 rounded-md" required />
            <button type="submit" className="m-2 border-solid border-2 rounded-md border-white bg-purple-400">Create User</button>
          </form>
        </>
    )
    }