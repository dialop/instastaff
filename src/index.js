import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from "./components/Nav";
import Job_Postings from "./components/Job_Postings";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider // Needs to wrap around BrowserRouter
      domain="dev-f5mq00rx18si8svy.us.auth0.com" // Replace with your Auth0 domain
      clientId="XJrEAsjVDcZ2tWhyaeOPsNC5okqv3rdG" // Replace with your Auth0 client ID
      redirectUri={window.location.origin}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/jobs" element={<Job_Postings/>} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
