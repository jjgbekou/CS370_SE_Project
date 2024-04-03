import { useState } from "react";

export function UserAvailability() {
    // Initialize availability state for all 7 days and 48 half-hour slots per day
  const [availability, setAvailability] = useState([...Array(7)].map(() => Array(48).fill(false)));

  // Function to toggle availability of a specific slot
  const toggleAvailability = (dayIndex, slotIndex) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex][slotIndex] = !updatedAvailability[dayIndex][slotIndex];
    setAvailability(updatedAvailability);
  };

  // Function to get the name of the day of the week
  const getDayOfWeek = (dayIndex) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const adjustedDayIndex = (today.getDay() + dayIndex) % 7;
    return daysOfWeek[adjustedDayIndex];
  };

  return (
    <div className="availability-picker">
      <table className="table-auto border border-gray-500">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-500"></th>
            {[...Array(48)].map((_, i) => (
              <th key={i} className="px-4 py-2 text-center border border-gray-500">{`${Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, dayIndex) => (
            <tr key={dayIndex}>
              <td className="px-4 py-2 font-semibold border border-gray-500">{getDayOfWeek(dayIndex)}</td>
              {availability[dayIndex].map((available, slotIndex) => (
                <td
                  key={slotIndex}
                  className={`px-4 py-2 text-center cursor-pointer border border-gray-500 ${available ? 'bg-green-500' : 'bg-gray-200'}`}
                  onClick={() => toggleAvailability(dayIndex, slotIndex)}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
