import React from 'react';
import '../styles/MarkerDetail.css';

const MarkerDetail = ({ markerData, onViewDetail, onContactAdmin, onBookJob }) => {
  const viewDetail = (id) => {
    // Define what happens when the view button is clicked
    onViewDetail(id);
  };

  const contactAdmin = (id) => {
    // Define what happens when the contact button is clicked
    onContactAdmin(id);
  };

  const bookJob = (id) => {
    // Define what happens when the book button is clicked
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