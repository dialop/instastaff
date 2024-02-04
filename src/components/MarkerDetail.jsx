import React from 'react';
import '../styles/MarkerDetail.css';
import notifications from "../helpers/notifications";

const MarkerDetail = ({ markerData, onViewDetail, onContactAdmin, onBookJob }) => {
  const openDirections = () => {
    // Request the user's location using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Now you can use userLocation for various purposes
        const directionsURL = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${markerData.lat},${markerData.lng}`;
        window.open(directionsURL, '_blank');
      },
      (error) => {
        console.error('Error getting user location:', error);
        alert('Could not determine your location. Please enable location services in your browser.');
      }
    );
  };

  const contactAdmin = (id) => {
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
      <button className="marker-window-button" /*onClick={}*/>View</button>
        <button className="marker-window-button" onClick={() => contactAdmin(markerData.id)}>Contact</button>
        <button className="marker-window-button" onClick={() => bookJob(markerData.id)}>Book</button>
        <button className="marker-window-button green-button" onClick={openDirections}>Go</button>
      </div>
    </div>
  );
};

export default MarkerDetail;
