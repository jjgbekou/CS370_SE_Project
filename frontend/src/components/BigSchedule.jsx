import moment from "moment/moment";

export function BigSchedule( {schedule}) { // Function to generate time slots from 8:30am to 5:30pm
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
  for (let i = 0; i < 14; i++) {
    const date = today.clone().add(i, 'days');
    dates.push(date.format('M/D')); // Format: Month/Day
  }
  return dates;
};

const renderScheduleRows = () => {
    const days = generateDates();
    return generateTimeSlots().map(slot => (
      <tr key={slot}>
        <td className="border border-gray-200 px-4 py-2">{slot}</td>
        {days.map((day, index) => {
          const person = schedule[day] && schedule[day][slot];
          console.log(person)
          return (
            <td key={`${day}-${slot}`} className="border border-gray-500 px-4 py-2">
              {person && <div className="shift bg-blue-100 text-blue-800 rounded-lg p-2">{person}</div>}
            </td>
          );
        })}
      </tr>
    ));
  };

return (
  <div className="schedule-calendar mt-24">
    <table className="table-auto">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-200 px-4 py-2"></th>
          {generateDates().map((day, index) => (
            <th key={index} className="border border-gray-500 text-black px-4 py-2">{day}</th>
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