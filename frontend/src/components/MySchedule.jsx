import { getDaSchedule } from "../data/api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment/moment";

export function MySchedule() {

  const [schedule, setSchedule] = useState({})

  useEffect(() => {
    async function loadSchedule() {
      let data = await getDaSchedule()
      setSchedule(data)
      return data
    }
    loadSchedule()
  })

  // Function to generate time slots from 8:30am to 5:30pm
  const generateTimeSlots = () => {
    const timeSlots = [];
    let hour = 8;
    let minute = 30;
    for (let i = 0; i < 18; i++) { // 18 slots from 8:30 to 17:30
      const time = `${hour}:${minute < 10 ? '0' : ''}${minute}`;
      timeSlots.push(time);
      minute += 30;
      if (minute >= 60) {
        hour++;
        minute = 0;
      }
    }
    return timeSlots;
  };

  // Function to generate an array of 7 consecutive dates starting from Sunday
  const generateDates = () => {
    const dates = [];
    const today = moment().startOf('week'); // Start from Sunday of the current week
    for (let i = 0; i < 7; i++) {
      const date = today.clone().add(i, 'days');
      dates.push(date.format('M/D')); // Format: Month/Day
    }
    return dates;
  };

  // Function to render schedule blocks for each time slot for all 7 days
  const renderScheduleRows = () => {
    const days = generateDates();
    const userSchedule = {};
    days.forEach(day => {
      userSchedule[day] = {};
      generateTimeSlots().forEach(slot => {
        userSchedule[day][slot] = schedule[day] && schedule[day][slot] ? schedule[day][slot] : '';
      });
    });

    return generateTimeSlots().map(slot => (
      <tr key={slot} className="border border-gray-200">
        <td className="border border-gray-200 px-4 py-2">{slot}</td>
        {days.map((day, index) => (
          <td key={`${day}-${slot}`} className="border border-gray-200 px-4 py-2">
            {userSchedule[day][slot] ? <div className="bg-blue-100 text-blue-800 rounded-lg p-2">{userSchedule[day][slot]}</div> : null}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="user-schedule">
      <table className="table-auto w-full mt-24">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-black">Time Slot</th>
            {generateDates().map((day, index) => (
              <th key={index} className="border border-gray-200 px-4 py-2 text-black">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderScheduleRows()}
        </tbody>
      </table>
    </div>
  );
};
