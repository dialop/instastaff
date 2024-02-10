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