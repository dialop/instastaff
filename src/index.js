import React from "react";
import { createRoot } from "react-dom/client"; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const container = document.getElementById('root'); 
const root = createRoot(container);

// Render the app inside the root
root.render(
  <React.StrictMode>
    <App/>
    <ToastContainer/>
  </React.StrictMode>
);

reportWebVitals();
