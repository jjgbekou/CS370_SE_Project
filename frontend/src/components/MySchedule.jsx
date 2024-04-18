import { getDaSchedule } from "../data/api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment/moment";
import { Loading } from "./Loading";

export function MySchedule( {userId} ) {

  const [schedule, setSchedule] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSchedule() {
      let data = await getDaSchedule()
      console.log(data)
      setSchedule(data.data.schedule)
      setLoading(false)
    }
    loadSchedule()
  }, [])

 // Function to generate time slots from 8:30am to 5:30pm in hour-long increments
const generateTimeSlots = () => {
  const timeSlots = [];
  let hour = 8;
  let minute = 30;
  for (let i = 0; i < 8; i++) { // 9 slots from 8:30 to 16:30
    const time = `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? '0' : ''}${minute}`;
    timeSlots.push(time);
    hour++;
  }
  return timeSlots;
};

   // Function to generate an array of 7 consecutive days of the week starting from Sunday
   const generateDates = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayIndex = moment().day(); // Get the index of the current day of the week (0 for Sunday, 1 for Monday, etc.)
    const rotatedDays = [...daysOfWeek.slice(todayIndex), ...daysOfWeek.slice(0, todayIndex)]; // Rotate the array so that it starts from Sunday
    return rotatedDays;
  };

  // Function to render schedule blocks for each time slot for all 7 days
  const renderScheduleRows = () => {
    const days = generateDates();
    const userSchedule = {};
    days.forEach(day => {
      userSchedule[day] = {};
      generateTimeSlots().forEach(slot => {
        console.log(schedule)
        console.log(schedule[day])
        console.log(schedule[day][slot])
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
    <>
    {!loading ?
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
    </div> :
    <Loading/>}
    </>
  );
};
