import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/MarkerDetail.css";
import notifications from "../helpers/notifications";
import ChatBox from "./ChatBox";
import { useApplicationData } from "../hooks/useApplicationData";

const MarkerDetail = ({ markerData, viewJobDetails, onContactAdmin }) => {
  const [showChatBox, setShowChatBox] = useState(false);
  const { state, addShift } = useApplicationData();
  const { user, getAccessTokenSilently } = useAuth0();

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
    const auth0_id = user ? user.sub : null;
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`/book-shift/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ auth0_id }),
      });

      if (response.ok) {
        const bookedShift = await response.json();
        addShift(bookedShift);
        notifications();
      } else {
        console.error('Error booking the job:', await response.text());
      }
    } catch (error) {
      console.error('Error booking the job:', error);
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
        <button className="marker-window-button" onClick={() => bookJob(markerData.id)}>Book</button>
        <button className="marker-window-button green-button" onClick={openDirections}>Go</button>
      </div>
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
