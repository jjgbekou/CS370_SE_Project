import moment from "moment/moment";

export function BigSchedule( {schedule}) { // Function to generate time slots from 8:30am to 5:30pm

console.log(schedule)

// Function to generate time slots from 8:30am to 5:30pm
const generateTimeSlots = () => {
  const timeSlots = [];
  let hour = 8;
  let minute = 30;
  for (let i = 0; i < 18; i++) { // 18 slots from 8:30 to 17:30
    const hourFormatted = hour < 10 ? `0${hour}` : `${hour}`;
    const minuteFormatted = minute < 10 ? `0${minute}` : `${minute}`;
    const time = `${hourFormatted}:${minuteFormatted}`;
    timeSlots.push(time);
    minute += 30;
    if (minute >= 60) {
      hour++;
      minute = 0;
    }
  }
  return timeSlots;
};

// Function to generate an array of tuples containing the day of the week and the corresponding date in M/D format
const generateDates = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = moment().day(); // Get the index of the current day of the week (0 for Sunday, 1 for Monday, etc.)
  const rotatedDays = [...daysOfWeek.slice(todayIndex), ...daysOfWeek.slice(0, todayIndex)]; // Rotate the array so that it starts from Sunday
  const today = moment().startOf('week'); // Start from Sunday of the current week
  const dates = rotatedDays.map(day => today.clone().day(day).format('M/D'));
  const daysWithDates = rotatedDays.map((day, index) => [day, dates[index]]); // Combine days and dates into tuples
  return daysWithDates;
};

const renderScheduleRows = () => {
  const days = generateDates();
  return generateTimeSlots().map(slot => (
    <tr key={slot} className="border border-gray-200">
      <td className="border border-gray-200 px-4 py-2">{slot}</td>
      {days.map((day, index) => {
        const person = schedule[day[0]] && schedule[day[0]][slot];

        return (
          <td key={`${day}-${slot}`} className="border border-gray-200 px-4 py-2">
            {person && <div className="bg-blue-100 text-blue-800 rounded-lg p-2">{person}</div>}
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