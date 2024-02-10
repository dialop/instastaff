// -- MAP VIEW: JOB POSTINGS COMPONENT -- //


import React, { useState } from 'react';
import Map from './Map';
import { useApplicationData } from '../../hooks/useApplicationData';
import MarkerDetail from '../map/MarkerDetail'; // Import MarkerDetail instead of JobPostingsModal

const MapPage = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const { state, setSelectedJob } = useApplicationData();

  // close MarkerDetail Modal
  const closeMarkerWindow = () => {
    console.log("Closing marker window");
    setSelectedJobId(null);
  };

  // Center of the map based on the borders
  function calculateCenter(borders) {
    let latSum = 0;
    let lngSum = 0;
    let count = 0;

    borders.forEach((border) => {
      border.forEach((coord) => {
        latSum += coord.lat;
        lngSum += coord.lng;
        count++;
      });
    });

    return {
      lat: latSum / count,
      lng: lngSum / count,
    };
  }

  // Borders of map
  const borders = [
    [
      { lat: 43.6817, lng: -79.4572 },
      { lat: 43.6329, lng: -79.4250 },
      { lat: 43.6396, lng: -79.3935 },
      { lat: 43.6879, lng: -79.3935 },
      { lat: 43.6879, lng: -79.4572 },
      { lat: 43.6817, lng: -79.4572 },
    ]
  ];

  // Center of the map based on the borders
  const location = calculateCenter(borders);

  const markers = Array.isArray(state.jobPostings) ? state.jobPostings.map((posting) => ({
    id: posting.id, // ID to each marker to identify
    lat: parseFloat(posting.facility_latitude),
    lng: parseFloat(posting.facility_longitude),
    title: posting.title,
    description: `${posting.facility_name} Location: ${posting.facility_short_address}`,
    imageUrl: posting.facility_images 
  })) : [];

  const selectedMarker = markers.find((marker) => marker.id === selectedJobId);

  // Adjust viewJobDetails to handle marker click instead of navigating
  const viewJobDetails = (jobId) => {
    setSelectedJobId(jobId); // Set the selected job ID
    // Optionally, you can still set the selected job in context if needed elsewhere
    const job = state.jobPostings.find((job) => job.id === jobId);
    setSelectedJob(job);
  };

  return (
    <div>
      <Map location={location} borders={borders} markers={markers} viewJobDetails={viewJobDetails} />
      {selectedMarker && (
        <MarkerDetail
          markerData={selectedMarker}
          onClose={closeMarkerWindow} // Pass the function to close MarkerDetail
        />
      )}
    </div>
  );
};

export default MapPage;
