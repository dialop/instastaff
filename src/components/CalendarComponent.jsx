import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css'

const CalendarComponent = (props) => {
  const { state, handleCalendarDate, getShiftForDate } = props;
  console.log('CalendarComponent  state:', state);
  


  const renderShiftsForDate = (date) => {
    const shiftsForDate = getShiftForDate(date);

    return (
      <div>
        <h2>{date.toDateString()}</h2>
        <ul>
          {shiftsForDate.map((shift, index) => (
            <li key={index}>
              <strong>Facility name: {shift.facility_name}</strong>
              <p>Location: {shift.address}, Toronto</p>
              <p>Shift Start Time: {shift.start_shift} AM</p>
              <p>Shift Duration: {shift.duration} hours</p>
              <p>Occupation Required: {shift.occupation}</p>
            </li>
            )
          )}
        </ul>
      </div>
    );
  };

  const handleCalendarChange = (newDate) => {
    handleCalendarDate(newDate);
  };


  return (
      <div className="flex mt-5 justify-center">
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
