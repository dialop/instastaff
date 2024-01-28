import React from "react";
import { createRoot } from "react-dom/client"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MapPage from './components/MapPage';
import JobPostings from "./components/JobPostings";

const container = document.getElementById('root'); 
const root = createRoot(container);

// Render the app inside the root
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> {/* Home route */}
        <Route path="/maps" element={<MapPage />} /> {/* Maps Route */}
        <Route path="/jobs" element={<JobPostings />} /> {/* Jobs Route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
