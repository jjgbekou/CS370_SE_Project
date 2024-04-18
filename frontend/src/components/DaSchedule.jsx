import { useState, useEffect } from "react"
import { getDaSchedule } from "../data/api"
import moment from 'moment'

export function DaSchedule( {schedule} ) {
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

  // Function to render schedule blocks for each hour slot
  const renderScheduleRows = () => {
    const days = generateDates();
    return generateTimeSlots().map(slot => (
      <tr key={slot} className="border border-gray-200">
        <td className="border border-gray-200 px-4 py-2">{slot}</td>
        {days.map((day, index) => {
          const person = schedule[day] && schedule[day][slot];
          console.log(schedule[day])
          console.log(schedule[day][slot])
          console.log(person)
          return (
            <td key={`${day}-${slot}`} className="border border-gray-200 px-4 py-2">
              {person && <div className="bg-blue-100 rounded-lg p-2 text-black">{person.name}</div>}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="hourly-schedule-calendar mt-28">
      <table className="table-auto w-full rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 bg-truman-blue">Time Slot</th>
            {generateDates().map((day, index) => (
              <th key={index} className="border border-gray-200 px-4 py-2 bg-truman-blue">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderScheduleRows()}
        </tbody>
      </table>
    </div>
  );
}