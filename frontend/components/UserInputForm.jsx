import { useState } from "react";
import axios from "axios"

export function UserInputForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    worker_id: '',
    hours: '',
    job_type: '',
    worker_type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/create_user/', { user_data: formData });
      console.log('Response from backend:', response.data);
      // Reset form data after successful submission
      setFormData({
        firstname: '',
        lastname: '',
        worker_id: '',
        hours: '',
        job_type: '',
        worker_type: ''
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Worker ID:
        <input
          type="text"
          name="worker_id"
          value={formData.worker_id}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Hours:
        <input
          type="text"
          name="hours"
          value={formData.hours}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Job Type:
        <input
          type="text"
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Worker Type:
        <input
          type="text"
          name="worker_type"
          value={formData.worker_type}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}