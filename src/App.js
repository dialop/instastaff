import React from 'react';
import MapComponent from './components/MapComponent';
import "./App.css";


function App() {
  return (
    <div className="App">
      <h1 className="text-xl font-bold mb-4">Map</h1>
      <div className="p-4 bg-gray-100">
        <MapComponent location="Toronto, ON" />
      </div>
    </div>
  );
}


export default App;
