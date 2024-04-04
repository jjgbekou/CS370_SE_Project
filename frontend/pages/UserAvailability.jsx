import { useState } from "react";

export function UserAvailability() {
    // Initialize availability state for all 7 days and 48 half-hour slots per day
  const [availability, setAvailability] = useState([...Array(7)].map(() => Array(16).fill(false)));

 // Function to toggle availability of a specific slot
 const toggleAvailability = (dayIndex, slotIndex) => {
  const updatedAvailability = [...availability];
  if (updatedAvailability[dayIndex][slotIndex]) {
    updatedAvailability[dayIndex][slotIndex] = null; // Toggle off if already available
  } else {
    const startTime = calculateTime(slotIndex);
    const endTime = calculateTime(slotIndex + 1);
    updatedAvailability[dayIndex][slotIndex] = [startTime, endTime]; // Set start and end time if available
  }
  console.log(updatedAvailability)
  setAvailability(updatedAvailability);
};

// Function to get the name of the day of the week
const getDayOfWeek = (dayIndex) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const adjustedDayIndex = (today.getDay() + dayIndex) % 7;
  return daysOfWeek[adjustedDayIndex];
};

// Function to calculate the time for each slot
const calculateTime = (slotIndex) => {
  const startHour = 8;
  const startMinute = 30;
  const slotHour = Math.floor(slotIndex / 2) + startHour;
  const slotMinute = slotIndex % 2 === 0 ? 0 : startMinute;
  return `${slotHour}:${slotMinute === 0 ? '00' : '30'}`;
};

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
        {[...Array(7)].map((_, dayIndex) => (
          <tr key={dayIndex}>
            <td className="px-4 py-2 font-semibold border border-gray-500">{getDayOfWeek(dayIndex)}</td>
            {availability[dayIndex].map((slot, slotIndex) => (
              <td
                key={slotIndex}
                className={`px-4 py-2 text-center cursor-pointer border border-gray-500 ${slot ? 'bg-green-500' : 'bg-gray-200'}`}
                onClick={() => toggleAvailability(dayIndex, slotIndex)}
              >{slot ? `${slot[0]} - ${slot[1]}` : ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};
