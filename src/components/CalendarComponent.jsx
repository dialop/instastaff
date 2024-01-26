// CalendarComponent.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Pass the selected date to the parent component
    onDateChange(newDate);
  };

  return (
    <div class="flex justify-center mt-20">
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
    </div>
  );
};

export default CalendarComponent;
