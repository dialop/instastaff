import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css'

const CalendarComponent = (props) => {
  const { state, handleCalendarDate, addShift, getShiftForDate } = props;
  

  const renderShiftsForDate = (date) => {
    const shiftsForDate = getShiftForDate(date);
    return (
      <div>
        <h2>Events for {date.toDateString()}</h2>
        <ul>
          {shiftsForDate.map((shift, index) => (
            <li key={index}>
              <strong>{shift.title}</strong>
              <p>{shift.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleCalendarChange = (newDate) => {
    // Use the handleDateChange action from the useApplicationData hook
    handleCalendarDate(newDate);
  };

  return (
<div style={{ display: 'flex' }}>
      {/* Sidebar with event information */}
      <div className='react-calendar'>
        {renderShiftsForDate(state.date)}
      </div>

      {/* Calendar */}
      <div style={{ flex: 2 }}>
        <Calendar
          onChange={handleCalendarChange}
          value={state.date}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
