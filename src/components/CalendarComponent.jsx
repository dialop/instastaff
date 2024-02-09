// -- CALENDAR COMPONENT --//

import React, { useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';
import { useState } from 'react';

const CalendarComponent = (props) => {
  const { state, handleCalendarDate, shiftsByUser, getShiftForDate } = props;
  const [jobStatus, setJobStatus] = useState({ is_filled: false });
  const [updateJob, setUpdateJob] = useState(false);
  console.log('shiftsByUser prop:', shiftsByUser);

  const handleCancelShift = (shiftId) => {
    try {
      setJobStatus((prevJobStatus) => ({
        ...prevJobStatus,
        is_filled: false,
      }));
      setUpdateJob((prev) => !prev);
      console.log(`Shift with ID ${shiftId} canceled`);
    } catch (error) {
      console.error('Error canceling shift:', error);
    }

    console.log(`Canceling shift with ID ${shiftId}`);
  };


  const renderShiftsForDate = (date) => {
    const shiftsForDate = getShiftForDate(date);

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
              <button onClick={() => handleCancelShift(shift.id)}>Cancel</button>
            </li>
          ))}
        </ul>
        ) : (
          <p className='react-calendar__navigation'>No shifts scheduled for this date</p>
        )}
      </div>
    );
  };

  // Handle calendar change event
  const handleCalendarChange = (newDate) => {
    handleCalendarDate(newDate);
  };

  return (
    <div className="flex mt-5 justify-center">
      <div className='react-calendar'>
        {/* Only render booked shifts if there are any for the selected date */}
        {state.date && renderShiftsForDate(state.date)}
      </div>
      <div>
        <Calendar
          onChange={handleCalendarChange}
          value={state.date}
          tileClassName={({ date, view }) => {
            // Highlight dates that have shifts
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
  );
};

export default CalendarComponent;