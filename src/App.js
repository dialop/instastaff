// - MAIN APP COMPONENT - //

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav';
import CalendarComponent from './components/CalendarComponent';
import useApplicationData from './hooks/useApplicationData';
import MapPage from './components/MapPage';
import JobPostings from "./components/JobPostings";

function Home() {
  return (
    <div>
      {/* Home page content */}
    </div>
  );
}

function App() {
  const {
    state,
    handleCalendarDate,
    addShift,
    getShiftForDate
  } = useApplicationData();
  return (
    <>
        <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<MapPage />} /> {/* Maps Route */}
        <Route path="/jobs" element={<JobPostings />} /> {/* Jobs Route */}
        <Route path="/calendar" element={<CalendarComponent 
      state = {state}
      handleCalendarDate = {handleCalendarDate}
      addShift = {addShift}
      getShiftForDate = {getShiftForDate}/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
