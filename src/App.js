// - MAIN COMPONENT - //

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav';
import MapComponent from './components/MapComponent';


function Home() {
  return (
    <div>
      {}
    </div>
  );
}

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

function App() {
  // border path for a Polyline
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

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/maps" element={<MapComponent location={location} borders={borders} />} /> {}
      </Routes>
    </>
  );
}

export default App;
