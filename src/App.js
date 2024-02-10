// -- APPLICATION ROUTING CONFIGURATION -- //

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import CalendarComponent from "./components/CalendarComponent";
import MapPage from "./components/map/MapPage";
import JobPostings from "./components/job_posting/JobPostings";
import { JobsContextProvider } from "./context/index";
import ProfilePage from "./components/profile/ProfilePage";
import UserHeader from "./components/layout/UserHeader";
import { ApplicationDataProvider, useApplicationData } from "./hooks/useApplicationData";
import ChatBox from "./components/ChatBox";
import MarkerDetail from "./components/map/MarkerDetail";
import AdminPostShift from "./components/user/AdminPostShift";
import Home from './components/home/Home'
import { RegistrationProvider } from "./context/RegistrationContext";
import { RewardsProvider } from "./context/RewardsContext";


function App() {
  const { addShift, state, handleCalendarDate, getShiftForDate} = useApplicationData();

  // const handleContactAdmin = (id) => {
  //   //console.log("Admin contacted with ID:", id);
  // };

  return (
    <RegistrationProvider>
      <RewardsProvider>
        <ApplicationDataProvider>
          <JobsContextProvider>
              <Navbar />
              <UserHeader />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/maps" element={<MapPage />} />
                <Route path="/jobs" element={<JobPostings />} />
                <Route path="/jobs/:jobId" element={<JobPostings />} />
                <Route path="/calendar" element={<CalendarComponent state={state} 
            handleCalendarDate={handleCalendarDate} 
            addShift={addShift} 
            getShiftForDate={getShiftForDate}/>} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/marker-detail" element={<MarkerDetail />} />
                <Route path="/post-shift" element={<AdminPostShift />} /> 
              </Routes>
              <Footer />
          </JobsContextProvider>
        </ApplicationDataProvider>
      </RewardsProvider>
    </RegistrationProvider>
  );
}

export default App;