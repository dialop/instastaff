// - MAIN COMPONENT - //

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav';
import { initMap } from './googleMap';

function App() {
  useEffect(() => {
    initMap();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default App;