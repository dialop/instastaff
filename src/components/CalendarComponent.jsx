// -- CALENDAR COMPONENT --//

import React, { useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';
import { ApplicationDataContext } from "../hooks/useApplicationData";

const CalendarComponent = () => {
  const { state, dispatch, handleCalendarDate, getShiftForDate, shiftsByUser } = useContext(ApplicationDataContext);

  // Fetch booked shifts when component mounts or user state changes
  useEffect(() => {
    const fetchBookedShifts = async () => {
      try {
        const response = await fetch('/api/calendar', {
          headers: {
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching booked shifts');
        }
        const data = await response.json();
        // Store booked shifts in state
        dispatch({ type: 'SHIFTS_BY_USER', payload: data });
      } catch (error) {
        console.error('Failed to fetch booked shifts:', error);
      }
    };

    fetchBookedShifts();
  }, [dispatch]); 

  // Render shifts for the selected date
  const renderShiftsForDate = (date) => {
    const shiftsForDate = getShiftForDate(date);
    if (shiftsForDate.length > 0) {
      return (
        <div className="booked-shifts">
          <h2>Booked Shifts for {date.toDateString()}</h2>
          {shiftsForDate.map((shift, index) => (
            <div key={index} className="booked-shift">
              <strong>{shift.facility_name}</strong>
              <p>{shift.address}</p>
              <p>{new Date(shift.start_shift).toLocaleTimeString()} AM</p>
              <p>{shift.duration} hours</p>
              <p>{shift.occupation}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
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