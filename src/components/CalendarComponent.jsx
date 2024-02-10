import {React, useState, useEffect, useContext} from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';
import { JobsContext } from "../context";

const CalendarComponent = (props) => {
  const { state, handleCalendarDate, shiftsByUser, getShiftForDate } = props;
  const [jobStatus, setJobStatus] = useState({ is_filled: false });
  const [updateJob, setUpdateJob] = useState(false);
  const [userId, setUserId] = useState(null);
  const { cancelJob } = useContext(JobsContext);
  // console.log('shiftsByUser prop:', shiftsByUser);
  

  // const handleCancelShift = (shiftId) => {
  //   try {
  //     setJobStatus((prevJobStatus) => ({
  //       ...prevJobStatus,
  //       is_filled: false,
  //       booked_by_user_id: null
  //     }));
  //     setUpdateJob((prev) => !prev);
  //     setUserId(null);
  //   } catch (error) {
  //     console.error("Error canceling shift:", error);
  //   }
  // };
  

  const renderShiftsForDate = (date) => {
    const shiftsForDate = getShiftForDate(date);

    console.log('shiftsForDate:', shiftsForDate);

    return (
      <div>
        <h2 className='react-calendar__navigation'>{date.toDateString()}</h2>
        {shiftsForDate.length > 0 ? (
        <ul className='react-calendar__navigation'>
          {shiftsForDate.map((shift, index) => (
            <li  key={index}>
              <strong>Facility name: {shift.facility_name}</strong>
              <p>Location: {shift.address}, Toronto</p>
              <p>Shift Start Time: {shift.start_shift} AM</p>
              <p>Shift Duration: {shift.duration} hours</p>
              <p>Occupation Required: {shift.occupation}</p>
              <button onClick={() => handleCancelShift(shift.job_id)}>Cancel</button>
            </li>
          ))}
        </ul>
        ) : (
          <p className='react-calendar__navigation'>No shifts scheduled for this date</p>
        )}
      </div>
    );
  };

const handleCancelShift = async (jobId) => {
  console.log('Cancelling job with jobId:', jobId);
  await cancelJob(jobId);
};

  const handleCalendarChange = (newDate) => {
    console.log('handle Calendar Change');
    console.log('New Date:', newDate);
    handleCalendarDate(newDate);
  };



 return (
  <>
  <div className="heading flex flex-col justify-center items-center">
  <h1 className="text-6xl py-8 text-[#24233E]">Calendar</h1>
  </div>
    <div className="flex mt-5 justify-center pb-10">
      <div className='react-calendar'>
        {renderShiftsForDate(state.date)}
      </div>
      <div>
        <Calendar
          onChange={handleCalendarChange}
          value={state.date}
          tileClassName={({ date, view }) => {
            if (view === 'month' && shiftsByUser?.some(shift => {
              const shiftDate = new Date(shift.shift_date);
              return shiftDate.getDate() === date.getDate() &&
                     shiftDate.getMonth() === date.getMonth() &&
                     shiftDate.getFullYear() === date.getFullYear();
            })) {
              return 'date-has-shift';
            }
            return null;
          }}
        />
      </div>
    </div>
    </>
  );
};

export default CalendarComponent;

// import React from 'react';
// import Calendar from 'react-calendar';
// import './CalendarStyle.css';

// const CalendarComponent = (props) => {
//   const { state, handleCalendarDate, shiftsByUser } = props;
//   console.log('shiftsByUser prop:', shiftsByUser);

//   const renderShiftsForDate = (date) => {
//     const formattedDate = date.toISOString().split("T")[0];
//     console.log('Date:', date, 'Formatted Date:', formattedDate); // Log the date and formattedDate
//     const shiftsForDate = shiftsByUser?.filter(
//       (shift) => shift.shift_date && shift.shift_date.split("T")[0] === formattedDate
//     ) || [];

//     console.log('Shifts for Date:', shiftsForDate); // Log the filtered shifts

//     return (
//       <div>
//         <h2>{date.toDateString()}</h2>
//         <ul>
//           {shiftsForDate.map((shift) => (
//             <li key={shift.id}>
//               <strong>Facility name: {shift.facility_name}</strong>
//               <p>Location: {shift.address}, Toronto</p>
//               <p>Shift Start Time: {shift.start_shift} AM</p>
//               <p>Shift Duration: {shift.duration} hours</p>
//               <p>Occupation Required: {shift.occupation}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   const handleCalendarChange = (newDate) => {
//     handleCalendarDate(newDate);
//   };

//   return (
//     <div className="flex mt-5 justify-center">
//       <div className='react-calendar'>
//         {renderShiftsForDate(state.date)} {/* Call the function here */}
//       </div>
//       <div>
//         <Calendar
//           onChange={handleCalendarChange}
//           value={state.date}
//           tileClassName={({ date }) =>
//             shiftsByUser?.some(
//               (shift) => shift.shift_date.split("T")[0] === date.toISOString().split("T")[0]
//             )
//               ? 'date-has-shift'
//               : ''
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default CalendarComponent;
