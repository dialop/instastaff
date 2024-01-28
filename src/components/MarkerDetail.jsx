// MarkerDetail.js
import React from 'react';
import '../styles/MarkerDetail.css';

const MarkerDetail = ({ markerData, travelTimes, onViewDetail, onContactAdmin, onBookJob }) => {
  // Handlers for view, contact, and book actions
  const viewDetail = (id) => onViewDetail(id);
  const contactAdmin = (id) => onContactAdmin(id);
  const bookJob = (id) => onBookJob(id);

  return (
    <div className="marker-window">
      <img src={markerData.imageUrl} alt={markerData.title} className="marker-window-image"/>
      <h3>{markerData.title}</h3>
      <p>{markerData.description}</p>
      {travelTimes && (
        <div>
          <p>Walking time: {travelTimes.walking}</p>
          <p>Biking time: {travelTimes.bicycling}</p>
          <p>Driving time: {travelTimes.driving}</p>
        </div>
      )}
      <div className="marker-window-buttons">
        <button className="marker-window-button" onClick={() => viewDetail(markerData.id)}>View</button>
        <button className="marker-window-button" onClick={() => contactAdmin(markerData.id)}>Contact</button>
        <button className="marker-window-button" onClick={() => bookJob(markerData.id)}>Book</button>
      </div>
    </div>
  );
};

export default MarkerDetail;
