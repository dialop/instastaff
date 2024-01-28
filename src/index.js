import React from "react";
import { createRoot } from "react-dom/client"; 
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Navbar from "./components/Nav";

const container = document.getElementById('root'); 
const root = createRoot(container);

// Render the app inside the root
root.render(
  <React.StrictMode>

    <App/>

  </React.StrictMode>
);

reportWebVitals();
