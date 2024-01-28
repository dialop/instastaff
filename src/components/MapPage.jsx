// - MAP PAGE -//

import React from 'react';
import MapComponent from './MapComponent';
import Navbar from './Nav';



const MapPage = () => {
  //const location = { lat: 43.6532, lng: -79.3832 }; // toronto coordinates 

  // center of the polyline
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

  // center of the map based on the borders
  const location = calculateCenter(borders);

  // sample markers inside Polyline
  const markers = [
    
    { lat: 43.6480, lng: -79.3942 }, // Near Trinity Bellwoods Park
    { lat: 43.6599, lng: -79.3952 }, // Near University of Toronto
    { lat: 43.6556, lng: -79.4195 }, // Near Little Italy
    { lat: 43.6616, lng: -79.4094 }, // Near Harbord Village
    { lat: 43.6641, lng: -79.4205 }, // Near Christie Pits
    { lat: 43.6736, lng: -79.4226 }, // Near Davenport
    { lat: 43.6807, lng: -79.4265 }, // Near St. Clair Village 
   
  ];


  return (
    <div>
      <h1>Maps</h1>
      <MapComponent location={location} borders={borders} markers={markers} />
    </div>
  );
};

export default MapPage;
