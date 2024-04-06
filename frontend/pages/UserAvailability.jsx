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
    const slotHour = Math.floor(slotIndex / 2) + startHour;
    const slotMinute = slotIndex % 2 === 0 ? startMinute : 0;
    //return `${slotHour}:${slotMinute === 0 ? '00' : '30'}`;
    if (slotMinute === 60)
    {
      slotHour +=1;
      slotMinute = 0;
    }
    return `${slotHour}:${slotMinute === 0 ? '00' : '30'}`;

  };

  async function handleSubmit() {
    let user_id = sessionStorage.getItem("userId")
    let userObject = {worker_id: user_id, unavailability: availability}
    let data = await updateUserAvailability(userObject)
  }

  return (
    <div className="availability-picker">
      <table className="table-auto border border-gray-500">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-500"></th>
            {[...Array(16)].map((_, i) => (
              <th key={i} className="px-4 py-2 text-center border border-gray-500">{calculateTime(i)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(availability).map(day => (
            <tr key={day}>
              <td className="px-4 py-2 font-semibold border border-gray-500">{day}</td>
              {[...Array(16)].map((_, slotIndex) => (
                <td
                  key={slotIndex}
                  className={`px-4 py-2 text-center cursor-pointer border border-gray-500 ${availability[day][slotIndex] ? 'bg-green-500' : 'bg-gray-200'}`}
                  onClick={() => toggleAvailability(day, slotIndex)}
                >{availability[day][slotIndex] ? `${availability[day][slotIndex][0]} - ${availability[day][slotIndex][1]}` : ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit Availability</button>
    </div>
  );
};
