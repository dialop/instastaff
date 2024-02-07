import React, { useState, useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/MarkerDetail.css";
import notifications from "../helpers/notifications";
import { ApplicationDataContext } from "../hooks/useApplicationData";

const MarkerDetail = ({ markerData, viewJobDetails, onContactAdmin }) => {
  const [showChatBox, setShowChatBox] = useState(false);

  // Attempt to get the context value
  const contextValue = useContext(ApplicationDataContext);
  console.log(contextValue); // Debugging: Log the context value

  // Ensure contextValue is not undefined before destructuring
  const { addCalendarEntry } = contextValue ?? {}; // Use optional chaining or a default value

  // const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const userId = window.sessionStorage.getItem('userId')

  
  const openDirections = () => {
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
    setShowChatBox(true);
    onContactAdmin(id);
  };

  const bookJob = async (id) => {
    if (!userId) {
      console.log('Please log in before booking.');
      return;
    }
    
    try {
      const response = await fetch(`/api/bookings/book-shift/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
    
      if (!response.ok) {
        // Check if the response is JSON or plain text
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorDetails = await response.json();
          throw new Error(`Failed to book job: ${errorDetails.message}`);
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to book job: ${errorText}`);
        }
      }
    
      const bookingDetails = await response.json();
      console.log('Booking successful:', bookingDetails);
      addCalendarEntry(bookingDetails.calendarEntry);
    } catch (error) {
      console.error('Booking error:', error);
    }
  };
  
  
  return (
    <div className="marker-window">
      <img src={markerData.imageUrl} alt={markerData.title} className="marker-window-image" />
      <h3>{markerData.title}</h3>
      <p>{markerData.description}</p>
      <div className="marker-window-buttons">
        <button className="marker-window-button" onClick={() => viewJobDetails(markerData.id)}>View</button>
        <button className="marker-window-button" onClick={() => handleContactAdmin(markerData.id)}>Contact</button>
        {/* Updated Book button with disabled prop based on isAuthenticated */}
        <button 
          className="marker-window-button" 
          onClick={() => bookJob(markerData.id)}
          disabled={!userId}>Book</button>
        <button className="marker-window-button green-button" onClick={openDirections}>Go</button>
      </div>
      {showChatBox && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 w-64 p-4 bg-white rounded-lg shadow-lg">
          <div>
            <p>Chat with admin</p>
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
