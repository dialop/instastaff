// - MAIN APP COMPONENT - //

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
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
    <Auth0Provider // Needs to wrap around BrowserRouter
      domain="dev-f5mq00rx18si8svy.us.auth0.com" // Replace with your Auth0 domain
      clientId="XJrEAsjVDcZ2tWhyaeOPsNC5okqv3rdG" // Replace with your Auth0 client ID
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-f5mq00rx18si8svy.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata"
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maps" element={<MapPage />} /> {/* Maps Route */}
          <Route path="/jobs" element={<JobPostings />} /> {/* Jobs Route */}
          <Route path="/user" />
          <Route path="/calendar" element={<CalendarComponent 
        state = {state}
        handleCalendarDate = {handleCalendarDate}
        addShift = {addShift}
        getShiftForDate = {getShiftForDate}/>} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
    </>
  );
}

export default App;