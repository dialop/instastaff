import React from 'react';
import '../styles/MarkerDetail.css';

const MarkerDetail = ({ markerData, onViewDetail, onContactAdmin, onBookJob }) => {
  const viewDetail = () => {
    onViewDetail(markerData.id); 
  };

  const contactAdmin = () => {
    onContactAdmin(markerData.id); 
  };

  const bookJob = () => {
    onBookJob(markerData); 
  }
  return (
    <div className="marker-window">
      <img src={markerData.imageUrl} alt={markerData.title} className="marker-window-image"/>
      <h3>{markerData.title}</h3>
      <p>{markerData.description}</p>
      <div className="marker-window-buttons">
        <button className="marker-window-button" onClick={viewDetail}>View</button>
        <button className="marker-window-button" onClick={contactAdmin}>Contact</button>
        <button className="marker-window-button" onClick={bookJob}>Book</button>
      </div>
    </div>
  );
};

export default MarkerDetail;
