import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css'

const CalendarComponent = (props) => {
  const { state, handleCalendarDate, getShiftForDate } = props;
  

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
    handleCalendarDate(newDate);
  };
  

  return (
      <div class="flex mt-5 justify-center">
        {/* Shift details*/}
      <div className='react-calendar'>
        {renderShiftsForDate(state.date)}
      </div>

      {/* Calendar */}
      <div>
      <Calendar
        onChange={handleCalendarChange}
        value={state.date}
        tileClassName={
          ({ date }) => getShiftForDate(date).length > 0 ? 'date-has-shift' : ''}
      />
      </div>
    </div>
  );
};

export default CalendarComponent;
