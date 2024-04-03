import { createUser } from "../data/api"
import { useState } from "react"

export function CreateUser() {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        worker_id: '',
        hours: '',
        job_type: '',
        worker_type: '',
        email: '',
        password: ''
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

    function handleCreate(e) {
        e.preventDefault()
        if (!lastname || !firstname || !workerType || !jobType || !email || !id || !password) {
            alert("Fields not all filled out OR invalid input in one of the fields")
            return
        }


    }

    return (
        <>
            Create User
        </>
    )
}