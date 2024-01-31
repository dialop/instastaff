import React from 'react';
import Map from './Map';
import useApplicationData from '../hooks/useApplicationData';

const MapPage = () => {
  const { state } = useApplicationData();

  console.log("Job Postings:", state.jobPostings);

  //  center of the map based on the borders
  function calculateCenter(borders) {
    let latSum = 0;
    let lngSum = 0;
    let count = 0;

    borders.forEach(border => {
      border.forEach(coord => {
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

  //borders of map
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

  // postings to markers
  const markers = state.jobPostings.map(posting => ({
    lat: parseFloat(posting.facility_latitude),
    lng: parseFloat(posting.facility_longitude),
    title: posting.title,
    description: posting.facility_name
  }));
  

  console.log(markers);


  return (
    <div>
      <h1>Maps</h1>
      <Map location={location} borders={borders} markers={markers} />
    </div>
  );
};

export default MapPage;
