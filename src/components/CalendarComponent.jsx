import React, { useState, useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';
import { JobsContext } from "../context";
import { useAuth0 } from '@auth0/auth0-react';

const CalendarComponent = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const { state, handleCalendarDate, shiftsByUser} = props;
  const { jobData } = useContext(JobsContext);
  // const { cancelJob } = useContext(JobsContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userId, setUserId] = useState(null);


  const fetchUserId = async () => {
    try {
      const userId = window.sessionStorage.getItem('userId');
      if (userId && isAuthenticated) {
        const response = await fetch(`/user/${userId}`);
        const data = await response.json();
        setUserId(userId);
      }
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  };
  
  useEffect(() => {
    fetchUserId();
  }, [isAuthenticated]);

  const handleCalendarChange = (newDate) => {
    handleCalendarDate(newDate);
    setSelectedDate(newDate);
  };

  useEffect(() => {
    console.log("Job data changed:", jobData);
  }, [jobData]);


  const handleCancelShift = async (jobId) => {
    console.log('Cancelling job with ID:', jobId);
    // await cancelJob(jobId);
  };


  const renderShiftDetails = () => {
    if (!selectedDate || !jobData) return null;
  
    // Filter jobData 
    const shiftsForDate = jobData.filter(job => {
      const jobDate = new Date(job.date); 
      return (
        jobDate.getDate() === selectedDate.getDate() &&
        jobDate.getMonth() === selectedDate.getMonth() &&
        jobDate.getFullYear() === selectedDate.getFullYear() &&
        job.booked_by_user_id === userId 
      );
    });
  
    return (
      <div>
        <h3 className='react-calendar__navigation'>Shifts for {selectedDate.toDateString()}:</h3>
        {shiftsForDate.length > 0 ? (
          <ul className='react-calendar__navigation'>
            {shiftsForDate.map((shift, index) => (
              
              <li key={index}>
                <strong>Facility name: {shift.facility_name}</strong>
                <p>Location: {shift.facility_short_address}, Toronto</p>
                <p>Shift Start Time: {shift.start_time} AM</p>
                <p>Shift Duration: {shift.duration} hours</p>
                <p>Occupation Required: {shift.title}</p>
                <button onClick={() => handleCancelShift(shift.id)}>Cancel</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No shifts scheduled for this date</p>
        )}
      </div>
    );
  };
  
  return (
    <>
      <div className="heading flex flex-col justify-center items-center">
        <h1 className="text-6xl py-8 text-[#24233E]">Calendar</h1>
      </div>
      <div className="flex mt-5 justify-center pb-10">
        <div className='react-calendar'>
        {renderShiftDetails()}
        </div>
        <div>
          <Calendar
            onChange={handleCalendarChange}
            value={state.date}
            tileClassName={({ date }) => {
              return shiftsByUser?.some(shift => {
                const shiftDate = new Date(shift.shift_date);
                return (
                  shiftDate.getDate() === date.getDate() &&
                  shiftDate.getMonth() === date.getMonth() &&
                  shiftDate.getFullYear() === date.getFullYear()
                );
              }) ? 'date-has-shift' : null;
            }}
          />
        </div>
         
      </div>
    </>
  );
};

export default CalendarComponent;

// import React, { useState, useEffect, useContext } from 'react';
// import Calendar from 'react-calendar';
// import './CalendarStyle.css';
// import { JobsContext } from '../context'; // Update the path as per your file structure

// const CalendarComponent = (props) => {
//   const { state, handleCalendarDate } = props;
//   const { jobData, cancelJob } = useContext(JobsContext);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [calendarDate, setCalendarDate] = useState([]);
//   console.log('jobData',jobData);

//   useEffect(() => {
//     if (jobData.length > 0) {
//       const uniqueDates = [...new Set(jobData.map(job => job.date))];
//       setCalendarDate(uniqueDates);
//       setLoading(false);
//     }
//   }, [jobData]);

//   useEffect(() => {
//     if (error) {
//       setLoading(false);
//     }
//   }, [error]);

//   const handleCancelShift = async (jobId) => {
//     console.log('Cancelling job with jobId:', jobId);
//     await cancelJob(jobId);
//   };

//   const renderShiftsForDate = (date) => {
//     const shiftsForDate = jobData.filter(job => job.date === date);

//     return (
//       <div>
//         <h2 className='react-calendar__navigation'>{date.toLocaleDateString()}</h2>
//         {shiftsForDate.length > 0 ? (
//           <ul className='react-calendar__navigation'>
//             {shiftsForDate.map((shift, index) => (
//               <li key={index}>
//                 <strong>Facility name: {shift.facility_name}</strong>
//                 <p>Location: {shift.address}, Toronto</p>
//                 <p>Shift Start Time: {shift.start_shift} AM</p>
//                 <p>Shift Duration: {shift.duration} hours</p>
//                 <p>Occupation Required: {shift.occupation}</p>
//                 <button onClick={() => handleCancelShift(shift.job_id)}>Cancel</button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className='react-calendar__navigation'>No shifts scheduled for this date</p>
//         )}
//       </div>
//     );
//   };

//   const handleCalendarChange = (newDate) => {
//     handleCalendarDate(newDate);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <>
//       <div className="heading flex flex-col justify-center items-center">
//         <h1 className="text-6xl py-8 text-[#24233E]">Calendar</h1>
//       </div>
//       <div className="flex mt-5 justify-center pb-10">
//         <div className='react-calendar'>
//           {renderShiftsForDate(state.date)}
//         </div>
//         <div>
//           <Calendar
//             onChange={handleCalendarChange}
//             value={state.date}
//             tileClassName={({ date }) => {
//               if (calendarDate.includes(date.toISOString().split('T')[0])) {
//                 return 'date-has-shift';
//               }
//               return null;
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default CalendarComponent;



// import React from 'react';
// import Calendar from 'react-calendar';
// import './CalendarStyle.css';
// import { useState, useContext, useEffect } from 'react';
// import { JobsContext } from "../context";
// import { useJobs} from '../hooks/useJobs'

// const CalendarComponent = (props) => {
//   const { state, handleCalendarDate, shiftsByUser, getShiftForDate} = props;
//   const { jobData, setJobData } = useJobs();
//   const [jobStatus, setJobStatus] = useState({ is_filled: false });
//   const [updateJob, setUpdateJob] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const { cancelJob } = useContext();
//   const {calendarDate, setCalendarDate} = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


  
//   useEffect(() => {
//     if (jobData.length > 0) {
//       const uniqueDates = [...new Set(jobData.map(job => job.date))];
//       setCalendarDate(uniqueDates);
//       setLoading(false);
//     }
//   }, [jobData]);

//   useEffect(() => {
//     if (error) {
//       setLoading(false);
//     }
//   }, [error]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("http://localhost:3000/api/jobs");
//         if (!res.ok) {
//           throw new Error("Failed to fetch job data");
//         }
//         const data = await res.json();
//         setJobData(data);
//         console.log('job data from useJobhook', data);
//       } catch (error) {
//         setError(error);
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCancelShift = async (jobId) => {
//     console.log('Cancelling job with jobId:', jobId);
//     await cancelJob(jobId);
//   };

//   const renderShiftsForDate = (date) => {
//     const shiftsForDate = getShiftForDate(date);

//     console.log('shiftsForDate:', shiftsForDate);

//   // console.log('shiftsByUser prop:', shiftsByUser);
  
//   //  const fetchCalendarData = async () => {
//   //     try {
//   //         const userId = window.sessionStorage.getItem('userId');
//   //         const response = await fetch(`/calendar/${userId}`);
//   //         if (!response.ok) {
//   //           throw new Error("Failed to fetch calendar data");
//   //         }
//   //         const data = await response.json();
//   //         setCalendarDate(data);
//   //         console.log('Calendar Data:', data);
//   //       } catch (error) {
//   //       console.error("Error fetching calendar data:", error);
//   //     }
//   //   };

//   // useEffect(() => {
//   //   console.log('state data', state.date)
//   //   fetchCalendarData();

//   // }, []);
 
//   // const handleCancelShift = (shiftId) => {
//   //   try {
//   //     setJobStatus((prevJobStatus) => ({
//   //       ...prevJobStatus,
//   //       is_filled: false,
//   //       booked_by_user_id: null
//   //     }));
//   //     setUpdateJob((prev) => !prev);
//   //     setUserId(null);
//   //   } catch (error) {
//   //     console.error("Error canceling shift:", error);
//   //   }
//   // };
  

//   // const renderShiftsForDate = (date) => {
//   //   const shiftsForDate = getShiftForDate(date);

//   //   console.log('shiftsForDate:', shiftsForDate);

//     return (
//       <div>
//         <h2 className='react-calendar__navigation'>{date.toDateString()}</h2>
//         {shiftsForDate.length > 0 ? (
//         <ul className='react-calendar__navigation'>
//           {shiftsForDate.map((shift, index) => (
//             <li  key={index}>
//               <strong>Facility name: {shift.facility_name}</strong>
//               <p>Location: {shift.address}, Toronto</p>
//               <p>Shift Start Time: {shift.start_shift} AM</p>
//               <p>Shift Duration: {shift.duration} hours</p>
//               <p>Occupation Required: {shift.occupation}</p>
//               <button onClick={() => handleCancelShift(shift.job_id)}>Cancel</button>
//             </li>
//           ))}
//         </ul>
//         ) : (
//           <p className='react-calendar__navigation'>No shifts scheduled for this date</p>
//         )}
//       </div>
//     );
//   };

// // const handleCancelShift = async (jobId) => {
// //   console.log('Cancelling job with jobId:', jobId);
// //   await cancelJob(jobId);
// // };

//   const handleCalendarChange = (newDate) => {
//     console.log('handle Calendar Change');
//     console.log('New Date:', newDate);
//     handleCalendarDate(newDate);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;


//  return (
//   <>
//   <div className="heading flex flex-col justify-center items-center">
//   <h1 className="text-6xl py-8 text-[#24233E]">Calendar</h1>
//   </div>
//     <div className="flex mt-5 justify-center pb-10">
//       <div className='react-calendar'>
//         {renderShiftsForDate(state.date)}
//       </div>
//       <div>
//         <Calendar
//           onChange={handleCalendarChange}
//           value={state.date}
//           tileClassName={({ date, view }) => {
//             if (view === 'month' && shiftsByUser?.some(shift => {
//               const shiftDate = new Date(shift.shift_date);
//               return shiftDate.getDate() === date.getDate() &&
//                      shiftDate.getMonth() === date.getMonth() &&
//                      shiftDate.getFullYear() === date.getFullYear();
//             })) {
//               return 'date-has-shift';
//             }
//             return null;
//           }}
//         />
//       </div>
//     </div>
//     </>
//   );
// };

// export default CalendarComponent;

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
