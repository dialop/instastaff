import React, { useState } from 'react';
import '../styles/MarkerDetail.css';
import notifications from "../helpers/notifications";
import ChatBox from './ChatBox'; 

const MarkerDetail = ({ markerData, viewJobDetails, onContactAdmin, onBookJob }) => {
  const [showChatBox, setShowChatBox] = useState(false); 

  const openDirections = () => {
    // user's location using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const directionsURL = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${markerData.lat},${markerData.lng}`;
        window.open(directionsURL, '_blank');
      },
      (error) => {
        console.error('Error getting user location:', error);
        alert('Could not determine your location. Please enable location services in your browser.');
      }
    );
  };

  const handleContactAdmin = (id) => {
    setShowChatBox(true); // Show the chat box
    onContactAdmin(id); 
  };

  const bookJob = (id) => {
    // onBookJob(id);
    const sendAppNotifications = notifications(id);
    sendAppNotifications(); 
  };

  return (
    <div className="marker-window">
      <img src={markerData.imageUrl} alt={markerData.title} className="marker-window-image"/>
      <h3>{markerData.title}</h3>
      <p>{markerData.description}</p>
      <div className="marker-window-buttons">
        <button className="marker-window-button" onClick={() => viewJobDetails(markerData.id)}>View</button>
        <button className="marker-window-button" onClick={() => handleContactAdmin(markerData.id)}>Contact</button>
        <button className="marker-window-button" onClick={() => bookJob(markerData.id)}>Book</button>
        <button className="marker-window-button green-button" onClick={openDirections}>Go</button>
      </div>
      {/* Chat UI */}
      {showChatBox && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 w-64 p-4 bg-white rounded-lg shadow-lg">
          <div>
            <p>Chat with admin</p>
            {/* messages and inputs */}
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => setShowChatBox(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MarkerDetail;
