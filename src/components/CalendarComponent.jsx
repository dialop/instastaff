import React, { useState, useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';
import { JobsContext } from "../context";
import { useAuth0 } from '@auth0/auth0-react';

const CalendarComponent = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const { state, handleCalendarDate } = props;
  const { dispatch } = useContext(JobsContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [calendarData, setCalendarData] = useState(null); 

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        if (isAuthenticated) {
          setIsLoading(true);
          const userId = window.sessionStorage.getItem('userId');
          const response = await fetch(`/calendar/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch calendar data");
          }
          const data = await response.json();
          setCalendarData(data); 
          console.log("calendarData:", calendarData);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching calendar data:", error);
        setIsLoading(false);
      }
    };

    fetchCalendarData();
  }, [isAuthenticated]);

  const handleCalendarChange = (newDate) => {
    handleCalendarDate(newDate);
    setSelectedDate(newDate);
  };

  return (
    <>
      <div className="heading flex flex-col justify-center items-center">
        <h1 className="text-6xl py-8 text-[#24233E]">Calendar</h1>
      </div>
      <div className="flex mt-5 items-center justify-center px-40 pb-10 h-[70vh] w-[100vw]">
        <div className='react-calendar'>
          {renderShiftDetails()}
        </div>
        <div>
          <Calendar
            className='ml-4'
            onChange={handleCalendarChange}
            value={state.date}
            tileClassName={({ date, view }) => {
              return calendarData?.some(shift => {
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

  function renderShiftDetails() {
    if (!selectedDate || !calendarData) return null;

    const shiftsForDate = calendarData.filter(shift => {
      const shiftDate = new Date(shift.shift_date); 
      return (
        shiftDate.getDate() === selectedDate.getDate() &&
        shiftDate.getMonth() === selectedDate.getMonth() &&
        shiftDate.getFullYear() === selectedDate.getFullYear()
      );
    });

  
    return (
      <div className=''>
        <h3 className='react-calendar__navigation'>Shifts for {selectedDate.toDateString()}:</h3>
        {shiftsForDate.length > 0 ? (
          <ul className='react-calendar__shift-card'>
            {shiftsForDate.map((shift, index) => (
              <li key={index}>
                <strong>Facility name: {shift.facility_name}</strong>
                <p>Location: {shift.address}, Toronto</p>
                <p>Shift Start Time: {shift.start_shift} AM</p>
                <p>Shift Duration: {shift.duration} hours</p>
                <p>Occupation Required: {shift.occupation}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='p-8 flex justify-center'>No shifts scheduled for this date</p>
        )}
      </div>
    );
  }
};

export default CalendarComponent;



// import React, { useState, useContext, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import './CalendarStyle.css';
// import { JobsContext } from "../context";
// import { useAuth0 } from '@auth0/auth0-react';

// const CalendarComponent = (props) => {
//   const { user, isAuthenticated } = useAuth0();
//   const { state, handleCalendarDate, shiftsByUser} = props;
//   const { jobData, dispatch } = useContext(JobsContext);
//   // const { cancelJob } = useContext(JobsContext);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   console.log('shifts',shiftsByUser);


//   // const fetchUserId = async () => {
//   //   try {
//   //     const userId = window.sessionStorage.getItem('userId');
//   //     if (userId && isAuthenticated) {
//   //       const response = await fetch(`/user/${userId}`);
//   //       const data = await response.json();
//   //       setUserId(userId);
//   //     }
//   //   } catch (error) {
//   //     console.error("Failed to fetch user ID:", error);
//   //   }
//   // };
  
//   // useEffect(() => {
//   //   fetchUserId();
//   // }, [isAuthenticated]);

//   useEffect(() => {
//     const fetchCalendarData = async () => {
//       try {
//         if (isAuthenticated) {
//           setIsLoading(true);
//           const userId = window.sessionStorage.getItem('userId');
//           const response = await fetch(`/calendar/${userId}`);
//           if (!response.ok) {
//             throw new Error("Failed to fetch calendar data");
//           }
//           const data = await response.json();
//           dispatch({ shiftsByUser: data  });
//           setIsLoading(false);
//         }
//       } catch (error) {
//         setError(error);
//         console.error("Error fetching calendar data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchCalendarData();
//   }, [isAuthenticated]);


//   const handleCalendarChange = (newDate) => {
//     handleCalendarDate(newDate);
//     setSelectedDate(newDate);
//   };

//   useEffect(() => {
//     console.log("Job data changed:", jobData);
//   }, [jobData]);


//   const handleCancelShift = async (jobId) => {
//     console.log('Cancelling job with ID:', jobId);
//     // await cancelJob(jobId);
//   };


//   const renderShiftDetails = () => {
//     if (!selectedDate || !jobData) return null;
  
//     // Filter jobData 
//     const shiftsForDate = jobData.filter(job => {
//       const jobDate = new Date(job.date); 
//       return (
//         jobDate.getDate() === selectedDate.getDate() &&
//         jobDate.getMonth() === selectedDate.getMonth() &&
//         jobDate.getFullYear() === selectedDate.getFullYear() &&
//         job.booked_by_user_id === userId 
//       );
//     });
  
//     return (
//       <div className=''>
//         <h3 className='react-calendar__navigation'>Shifts for {selectedDate.toDateString()}:</h3>
//         {shiftsForDate.length > 0 ? (
//           <ul className='react-calendar__shift-card'>
//             {shiftsForDate.map((shift, index) => (
              
//               <li key={index}>
//                 <strong>Facility name: {shift.facility_name}</strong>
//                 <p>Location: {shift.facility_short_address}, Toronto</p>
//                 <p>Shift Start Time: {shift.start_time} AM</p>
//                 <p>Shift Duration: {shift.duration} hours</p>
//                 <p>Occupation Required: {shift.title}</p>
//                 <button onClick={() => handleCancelShift(shift.id)}>Cancel</button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className='p-8 flex justify-center'>No shifts scheduled for this date</p>
//         )}
//       </div>
//     );
//   };
  
//   return (
//     <>
//       <div className="heading flex flex-col justify-center items-center">
//         <h1 className="text-6xl py-8 text-[#24233E]">Calendar</h1>
//       </div>
//       <div className="flex mt-5 items-center justify-center px-40 pb-10 h-[70vh] w-[100vw]">
//         <div className='react-calendar'>
//           {renderShiftDetails()}
//         </div>
//         <div>
//           <Calendar
//             className='ml-4'
//             onChange={handleCalendarChange}
//             value={state.date}
//             tileClassName={({ date }) => {
//               return shiftsByUser?.some(shift => {
//                 const shiftDate = new Date(shift.shift_date);
//                 return (
//                   shiftDate.getDate() === date.getDate() &&
//                   shiftDate.getMonth() === date.getMonth() &&
//                   shiftDate.getFullYear() === date.getFullYear()
//                 );
//               }) ? 'date-has-shift' : null;
//             }}
//           />
//         </div>
         
//       </div>
//     </>
//   );
// };

// export default CalendarComponent;
