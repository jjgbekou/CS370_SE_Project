import { useState, useEffect } from "react"
import { ConfirmationModal } from "../components/ConfirmationModal"
import { applyForShift, giveUpShift } from "../data/api"
import moment from 'moment'

export function DaSchedule( {schedule, userId, setRefresh} ) {

  const [giveIsOpen, setGiveIsOpen] = useState(false)
  const [applyIsOpen, setApplyIsOpen] = useState(false)
  const [givePerson, setGivePerson] = useState({})
  const [applyPerson, setApplyPerson] = useState({})

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
          return (
            <td key={`${day}-${slot}`} className={"border border-gray-200 px-4 py-2 " + (!person ? "cursor-pointer hover:bg-blue-500" : "")} onClick={() => handleApplyClick(day, slot, person)}>
              {person && <div className={"bg-blue-100 rounded-lg p-2 text-black " + (person.userId == userId ? "cursor-pointer hover:bg-blue-500" : "")} onClick={() => handleGiveClick(day, slot, person)}>{person.name}</div>}
            </td>
          );
        })}
      </tr>
    ));
  };

  // Function to handle click event on a cell
  const handleGiveClick = (day, slot, person) => {
    if ((schedule[day] && schedule[day][slot]).userId == userId) {
      // Call the provided onCellClick function if the cell belongs to the current user
      openGiveModal()
      setGivePerson({time_slot: slot, worker_id: person.userId, day: day})
    }
  };

  const handleApplyClick = (day, slot, person) => {
    if (!person) {
      openApplyModal()
      setApplyPerson({time_slot: slot, worker_id: userId, day: day})
    }
  }

  async function handleGiveShift(userObject) {
    await giveUpShift(userObject)
    setGivePerson({})
  }

  async function handleApplyShift(userObject) {
    await applyForShift(userObject)
  }

  function openGiveModal() {
    setGiveIsOpen(true)
  }

  function openApplyModal() {
    setApplyIsOpen(true)
  }

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
      {giveIsOpen && <ConfirmationModal title={"Give up this shift?"} message={"Giving up this shift will remove you from the schedule in this time slot. Press confirm to give it up."} buttonCancel={"Cancel"} buttonConfirm={"Confirm"} isOpen={giveIsOpen} setIsOpen={setGiveIsOpen} confirmationFunction={handleGiveShift} confirmationParams={givePerson} setRefresh={setRefresh}/>}
      {applyIsOpen && <ConfirmationModal title={"Apply for this shift?"} message={"If this shift is empty, you can apply yourself to work this shift. Press confirm to apply."} buttonCancel={"Cancel"} buttonConfirm={"Confirm"} isOpen={applyIsOpen} setIsOpen={setApplyIsOpen} confirmationFunction={handleApplyShift} confirmationParams={applyPerson} setRefresh={setRefresh}/>}
    </div>
  );
}