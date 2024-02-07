import React from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';

const CalendarComponent = ({ state, handleCalendarDate, shiftsByUser, getShiftForDate }) => {

  const renderShiftsForDate = (date) => {
    // Get shifts for the selected date
    const shiftsForDate = getShiftForDate(date);
    // Check if there are shifts for the selected date
    if (shiftsForDate.length > 0) {
      return (
        <div>
          <h2>Booked Shifts for {date.toDateString()}</h2>
          <ul>
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
        </div>
      );
    }
    return null; // Return null or a message if no shifts are booked for the selected date
  };

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
