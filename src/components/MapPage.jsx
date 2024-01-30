// - MAP PAGE -//
import React, { useState, useEffect } from 'react';
import Map from './Map';
import Navbar from './Nav';
import axios from 'axios';


const MapPage = () => {
  // Function to calculate the center of the polyline
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
    { 
      lat: 43.6480, 
      lng: -79.3942, 
      title: 'Marker 1',
      description: 'Description for Marker 1.'
    }, 
    { 
      lat: 43.6599,
      lng: -79.3952,
      title: 'Marker 2',
      description: 'Description for Marker 2.'
    }, 
    { 
      lat: 43.6556,
      lng: -79.4195,
      title: 'Marker 3',
      description: 'Description for Marker 3.'
    },
    { 
      lat: 43.6616, 
      lng: -79.4094,
      title: 'Marker 4',
      description: 'Description for Marker 4.'
    }, 
    { 
      lat: 43.6641,
      lng: -79.4205,
      title: 'Marker 5',
      description: 'Description for Marker 5.'
    }, 
    { 
      lat: 43.6736, 
      lng: -79.4226,
      title: 'Marker 6',
      description: 'Description for Marker 6.'
    }, 
    { 
      lat: 43.6807,
      lng: -79.4265,
      title: 'Marker 7',
      description: 'Description for Marker 7.'
    },
  ];

  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [travelTimes, setTravelTimes] = useState({});

  const fetchTravelTimes = async (destination) => {
    try {
      const response = await axios.get('/api/calculateTravelTimes', {
        params: {
          originLat: userLocation.lat,
          originLng: userLocation.lng,
          destLat: destination.lat,
          destLng: destination.lng
        }
      });
      setTravelTimes(response.data);
    } catch (error) {
      console.error('Error fetching travel times:', error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  }, []);


  return (
    <div>
      <h1>Maps</h1>
      <Map
        location={location}
        borders={borders}
        markers={markers}
        userLocation={userLocation}
        travelTimes={travelTimes}
        onMarkerSelect={fetchTravelTimes}
      />
    </div>
  );
};

export default MapPage;