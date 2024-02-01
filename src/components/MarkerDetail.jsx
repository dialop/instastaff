import React from 'react';
import '../styles/MarkerDetail.css';

const MarkerDetail = ({ markerData, onViewDetail, onContactAdmin, onBookJob }) => {
  const viewDetail = (id) => {
    
    onViewDetail(id);
  };

  const contactAdmin = (id) => {
 
    onContactAdmin(id);
  };

  const bookJob = (id) => {
    
    onBookJob(id);
  };

  return (
    <div className="marker-window">
      <img src={markerData.imageUrl} alt={markerData.title} className="marker-window-image"/>
      <h3>{markerData.title}</h3>
      <p>{markerData.description}</p>
      <div className="marker-window-buttons">
        <button className="marker-window-button" onClick={() => viewDetail(markerData.id)}>View</button>
        <button className="marker-window-button" onClick={() => contactAdmin(markerData.id)}>Contact</button>
        <button className="marker-window-button" onClick={() => bookJob(markerData.id)}>Book</button>
      </div>
    </div>
  );
};

export default MarkerDetail;