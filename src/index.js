import React from "react";
import { createRoot } from "react-dom/client"; // Corrected import for React 18
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MapPage from './components/MapPage';
import Job_Postings from "./components/Job_Postings";

const root = document.getElementById('root');
const rootElement = createRoot(root); // Create a root

rootElement.render( // Render the app inside the root
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

reportWebVitals();
