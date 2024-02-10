import React, { useState, useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { ApplicationDataContext } from "../../hooks/useApplicationData";
import "../../styles/MarkerDetail.css"

const MarkerDetail = ({ markerData, viewJobDetails, onClose, onContactAdmin,  }) => {
  const [showChatBox, setShowChatBox] = useState(false);
  const closeMarkerWindow = () => {
    // setShowChatBox(false);
    console.log("close");

  }
  // Context
  const contextValue = useContext(ApplicationDataContext);
  const { addCalendarEntry } = contextValue ?? {}; 

  // Auth
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userId = user?.sub;

  const openDirections = () => {
    // Open Google Maps directions
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

  // const handleContactAdmin = (id) => {
    // Contacting admin
  //   setShowChatBox(true);
  //   onContactAdmin(id);
  // };

  // const bookJob = async (id) => {
  //   // Book a job
  //   if (!userId) {
  //     console.log('Please log in before booking.');
  //     return;
  //   }
    
  //   try {
  //     const response = await fetch(`/api/bookings/book-shift/${id}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ userId }),
  //     });
  
  //     if (!response.ok) {
  //       const errorDetails = await response.json();
  //       if (response.status === 409) {
  //         alert(errorDetails.message);
  //       } else {
  //         throw new Error(`Failed to book job: ${errorDetails.message}`);
  //       }
  //     } else {
  //       const bookingDetails = await response.json();
  //       console.log('Booking successful:', bookingDetails);
  //       addCalendarEntry({
  //         newShift: bookingDetails.bookedShift,
  //         calendarEntry: bookingDetails.calendarEntry
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Booking error:', error);
  //   }
  // };
  const CloseButton = ({ onClick }) => (
    <button
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center absolute top-2 right-2"
      onClick={onClick}
    >
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
  <span className="sr-only">Close</span>
</button>
  );
  

  
  return (
    <div className="marker-details-container bg-transparent max-w-80vw font-sans rounded-lg shadow-md relative">
      {/* Custom close button */}
      <CloseButton onClick={onClose} />

      <img src={markerData.imageUrl} alt={markerData.title} className="w-full h-160 object-cover" />
      
      <div>
        <h3 className="marker-details-title text-lg font-medium">{markerData.title}</h3>
        <p className="marker-details-content p-2 text-sm font-normal">{markerData.description}</p>
      </div>
      
      <div className="marker-window-buttons flex justify-center gap-2 p-2">
        <button className="marker-window-button bg-[rgb(101,71,165)] text-white py-1 px-2 text-sm rounded-lg shadow hover:bg-[rgb(91,61,155)] focus:outline-none focus:ring-2 focus:ring-[rgb(101,71,165)] focus:ring-opacity-50 uppercase" onClick={() => viewJobDetails(markerData.id)}>View</button>
        {/* <button className="marker-window-button bg-[rgb(101,71,165)] text-white py-1 px-2 text-sm rounded-lg shadow hover:bg-[rgb(91,61,155)] focus:outline-none focus:ring-2 focus:ring-[rgb(101,71,165)] focus:ring-opacity-50 uppercase" onClick={() => handleContactAdmin(markerData.id)}>Contact</button> */}
        {/* <button className="marker-window-button bg-[rgb(101,71,165)] text-white py-1 px-2 text-sm rounded-lg shadow hover:bg-[rgb(91,61,155)] focus:outline-none focus:ring-2 focus:ring-[rgb(101,71,165)] focus:ring-opacity-50 uppercase" onClick={() => bookJob(markerData.id)} disabled={!userId}>Book</button> */}
        <button className="marker-window-button bg-green-500 text-white py-1 px-2 text-sm rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 uppercase" onClick={openDirections}>Directions</button>
      </div>
      
      {/* {showChatBox && (
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
        </div> */}
    </div>
  );
};

export default MarkerDetail;