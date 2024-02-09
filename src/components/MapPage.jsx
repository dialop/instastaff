// -- MAP VIEW: JOB POSTINGS COMPONENT -- //

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from './Map';
import { useApplicationData } from '../hooks/useApplicationData';
import JobPostingsModal from './JobPostingsModal';

const MapPage = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Hooks
  const navigate = useNavigate();
  const { state, setSelectedJob } = useApplicationData();

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
    description: `${posting.facility_name}\nShift Date: ${posting.date}`,
    imageUrl: posting.facility_images 
  })) : [];

  
  //console.log('photo', markers);
  
  const selectedMarker = markers.find((marker) => marker.id === selectedJobId);

  // Function to view job details
  const viewJobDetails = (jobId) => {
    const job = state.jobPostings.find((job) => job.id === jobId);
    setSelectedJob(job); 
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div>
      <h1>Maps</h1>
      <Map location={location} borders={borders} markers={markers} viewJobDetails={viewJobDetails} />
      {selectedMarker && <JobPostingsModal job={selectedMarker} />} 
    </div>
  );
};

export default MapPage;
