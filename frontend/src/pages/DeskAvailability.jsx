import moment from 'moment';
import { useState } from 'react';
import { updateUserAvailability } from '../data/api';
import { AlertModal } from '../components/AlertModal';
import { useNavigate } from 'react-router-dom';

export function DeskAvailability() {
  const [isOpen, setIsOpen] = useState(false)
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

  let user = JSON.parse(sessionStorage.getItem("User"));
  let userView = user.view === "User";
  let navigate = useNavigate()

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function redirect() {
    navigate("/home")
  }

  // Function to toggle availability of a specific slot
  const toggleAvailability = (day, hourIndex) => {
    const updatedAvailability = { ...availability };
    if (updatedAvailability[day][hourIndex]) {
      updatedAvailability[day][hourIndex] = null; // Toggle off if already available
    } else {
      const startTime = calculateTime(hourIndex);
      const endTime = calculateTime(hourIndex + 1);
      //updatedAvailability[day][hourIndex] = [startTime, endTime]; // Set start and end time if available
      updatedAvailability[day][hourIndex] = startTime
    }
    setAvailability(updatedAvailability);
  };

  // Function to calculate the time for each slot
  const calculateTime = (hourIndex) => {
    const startHour = 8;
    const slotHour = startHour + hourIndex;
    return `${slotHour < 10 ? "0" : ""}${slotHour}:30`; // Format the time
  };

  async function handleSubmit() {
    let user = JSON.parse(sessionStorage.getItem("User"));
    let userId = user.userId;
    let userObject = { worker_id: userId, unavailability: availability };
    let data = await updateUserAvailability(userObject);
    if (data.status == 200) {
      openModal()
    } else {
      alert("Something went wrong :(")
    }
    // Handle response if needed
  }

  return (
    <>
      {userView ? (
        <div className="flex flex-col mt-20">
        <span className="mb-8 text-2xl font-bold">Enter in your UNAVAILABILITY here (times you are not available):</span>
        <span className="mb-8 text-lg">Any submitted unavailability will be taken into account next scheduling cycle</span>
        <div className="availability-picker">
          <table className="table-auto border border-gray-500 ">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-500"></th>
                {[...Array(8)].map((_, i) => (
                  <th
                    key={i}
                    className="px-4 py-2 text-center border border-gray-500"
                  >
                    {calculateTime(i)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(availability).map((day) => (
                <tr key={day}>
                  <td className="px-4 py-2 font-semibold border border-gray-500">
                    {day}
                  </td>
                  {[...Array(8)].map((_, hourIndex) => (
                    <td
                      key={hourIndex}
                      className={`px-4 py-2 text-center cursor-pointer border border-gray-500 ${
                        availability[day][hourIndex]
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                      onClick={() => toggleAvailability(day, hourIndex)}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit Unvailability
          </button>
        </div>
        </div>
      ) : (
        <h1>You do not have permission to access this page</h1>
      )}
      {isOpen && <AlertModal title={"Availability Submitted"} message={"Your availability has been successfully submitted for the next work cycle. Confirm to navigate to the schedule page."} button={"Confirm"} isOpen={isOpen} setIsOpen={setIsOpen} doneFunction={redirect} closeModal={closeModal}/>}
    </>
  );
};
