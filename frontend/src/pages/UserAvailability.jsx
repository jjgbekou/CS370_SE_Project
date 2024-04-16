import { useState } from "react";
import { updateUserAvailability } from "../data/api";

export function UserAvailability() {
  // Initialize availability state for all 7 days with empty arrays for time slots
  const [availability, setAvailability] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  let user = JSON.parse(sessionStorage.getItem("User"))
  let userView = user.view == "User"
  console.log(userView)

  // Function to toggle availability of a specific slot
  const toggleAvailability = (day, slotIndex) => {
    const updatedAvailability = { ...availability };
    if (updatedAvailability[day][slotIndex]) {
      updatedAvailability[day][slotIndex] = null; // Toggle off if already available
    } else {
      const startTime = calculateTime(slotIndex);
      const endTime = calculateTime(slotIndex + 1);
      updatedAvailability[day][slotIndex] = [startTime, endTime]; // Set start and end time if available
    }
    console.log(updatedAvailability)
    setAvailability(updatedAvailability);
  };

 // Function to calculate the time for each slot
const calculateTime = (slotIndex) => {
  const startHour = 8;
  const startMinute = 30;
  const totalMinutes = startMinute + (slotIndex * 30); // Calculate total minutes from start time
  const slotHour = Math.floor(totalMinutes / 60) + startHour; // Calculate slot hour
  const slotMinute = totalMinutes % 60; // Calculate slot minute
  return `${slotHour}:${slotMinute < 10 ? '0' : ''}${slotMinute}`; // Format the time
};

  async function handleSubmit() {
    let user = JSON.parse(sessionStorage.getItem("User"))
    let user_id = user.userId
    let userObject = {worker_id: user_id, unavailability: availability}
    let data = await updateUserAvailability(userObject)
  }

  return (
    <>
    {
      userView 
      ? 
      <div className="availability-picker">
        <table className="table-auto border border-gray-500 mt-20">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-500"></th>
              {[...Array(19)].map((_, i) => (
                <th key={i} className="px-4 py-2 text-center border border-gray-500">{calculateTime(i)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(availability).map(day => (
              <tr key={day}>
                <td className="px-4 py-2 font-semibold border border-gray-500">{day}</td>
                {[...Array(19)].map((_, slotIndex) => (
                  <td
                    key={slotIndex}
                    className={`px-4 py-2 text-center cursor-pointer border border-gray-500 ${availability[day][slotIndex] ? 'bg-green-500' : 'bg-gray-200'}`}
                    onClick={() => toggleAvailability(day, slotIndex)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit Availability</button>
    </div>
    :
    <h1>You do not have permission to access this page</h1>
    }
  </>
  );
};
