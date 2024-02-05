import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import CalendarComponent from "./components/CalendarComponent";
import MapPage from "./components/MapPage";
import JobPostings from "./components/JobPostings";
import { JobsContextProvider } from "./context/index";
import ProfilePage from "./components/ProfilePage";
import UserHeader from "./components/UserHeader";
import { ApplicationDataProvider, useApplicationData } from "./hooks/useApplicationData";
import ChatBox from "./components/ChatBox";
import { RegistrationProvider } from './context/RegistrationContext';
import MarkerDetail from "./components/MarkerDetail";



function Home() {
  return <div>{/* Home page content */}</div>;
}

function App() {
  const { addShift, state, handleCalendarDate, getShiftForDate } = useApplicationData();

  const handleContactAdmin = (id) => {
    //console.log("Admin contacted with ID:", id);
  };

  return (
    <Auth0Provider
      domain="dev-f5mq00rx18si8svy.us.auth0.com"
      clientId="XJrEAsjVDcZ2tWhyaeOPsNC5okqv3rdG"
      redirectUri={window.location.origin}
    >
      <ApplicationDataProvider>
        <JobsContextProvider>
          <RegistrationProvider>
            <BrowserRouter>
              <Navbar />
              <UserHeader />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/maps" element={<MapPage />} />
                <Route path="/jobs" element={<JobPostings />} />
                <Route path="/jobs/:jobId" element={<JobPostings />} />
                <Route path="/calendar" element={<CalendarComponent state={state} handleCalendarDate={handleCalendarDate} addShift={addShift} getShiftForDate={getShiftForDate} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/chat" element={<ChatBox onContactAdmin={handleContactAdmin} />} />
                <Route path="/marker-detail" element={<MarkerDetail />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </RegistrationProvider>
        </JobsContextProvider>
      </ApplicationDataProvider>
    </Auth0Provider>
  );
}

export default App;
