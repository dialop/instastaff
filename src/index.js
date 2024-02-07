import React from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById('root');
const root = createRoot(container);

// Render the app inside the root
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-f5mq00rx18si8svy.us.auth0.com"
      clientId="XJrEAsjVDcZ2tWhyaeOPsNC5okqv3rdG"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
