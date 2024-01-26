import React from 'react';
import MapComponent from './components/MapComponent';
import "./App.css";

function App() {
  return (
    <div>
      <h1> Map</h1>
      <MapComponent location="Toronto, ON" />
    </div>
  );
}

export default App;
