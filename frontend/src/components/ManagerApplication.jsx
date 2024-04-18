import { useState } from "react"
import { AlertModal } from "./AlertModal"
import { createManager } from "../data/api";

export function ManagerApplication( {setMode} ) {

    const [isOpen, setIsOpen] = useState(false)
    const [manager, setManager] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      });

    const handleChange = (e) => {
        setManager({ ...manager, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await createManager(manager)
        if (response.status == 200) {
          openModal()
        } else {
          alert("User account could not be created. Please try again.")
        }
    }

    function openModal() {
        setIsOpen(true)
      }

      function redirect() {
        setMode("Login")
      }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input type="text" name="lastname" placeholder="Last Name" value={manager.lastname} onChange={handleChange} className="m-2 p-2 rounded-md" required />
                <input type="text" name="firstname" placeholder="First Name" value={manager.firstname} onChange={handleChange}className="m-2 p-2 rounded-md" required />
                <input type="email" name="email" placeholder="Email" value={manager.email} onChange={handleChange} className="m-2 p-2 rounded-md" required />
                <input type="password" name="password" placeholder="Password" value={manager.password} onChange={handleChange} className="m-2 p-2 rounded-md" required />
                <button type="submit" className="m-2 border-solid border-2 rounded-md border-white bg-truman-purple">Apply for Manager</button>
            </form>
            {isOpen && <AlertModal isOpen={isOpen} setIsOpen={setIsOpen} title={"Manager Application Submitted"} message={"Your application to create a manager account has been submitted. Your account will not be valid until the administration has validated your credentials and added you as a manager."} button={"Confirm"} doneFunction={redirect}/>}
        </>
    )
}