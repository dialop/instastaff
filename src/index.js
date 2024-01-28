// - ROOT COMPONENT RENDERING AND ROUTING - //

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MapPage from './components/MapPage';
import Job_Postings from "./components/Job_Postings";

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> {/* Home route */}
        <Route path="/maps" element={<MapPage />} /> {/* Maps Route */}
        <Route path="/jobs" element={<Job_Postings/>} /> {/* Jobs Route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
