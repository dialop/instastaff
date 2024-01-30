// - MAP COMPONENT TO DISPLAY GOOGLE MAPS - //

import React, { useEffect, useRef, useState } from 'react';
import MarkerDetail from './MarkerDetail';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../styles/Map.css';

const Map = ({ borders, markers }) => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const initMap = () => {
    const mapOptions = {
      zoom: 13.4,
      center: userLocation,
      styles: [
        { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill' },
        { featureType: 'poi', elementType: 'geometry' },
        { featureType: 'poi.park', elementType: 'geometry' },
        { featureType: 'road', elementType: 'geometry' },
        { featureType: 'road.arterial', elementType: 'labels.text.fill' },
        { featureType: 'road.highway', elementType: 'geometry' },
          { featureType: 'road.local', elementType: 'labels.text.fill' },
          { featureType: 'transit.line', elementType: 'geometry' },
          { featureType: 'water', elementType: 'geometry' },
        ],
      };
      
      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
    };
    
  
   // Function to create info windows for markers
  const createInfoWindow = (markerData, map) => {
    const content = document.createElement('div');
    const reactRoot = ReactDOM.createRoot(content);
    reactRoot.render(<MarkerDetail markerData={markerData} />);
    return new window.google.maps.InfoWindow({ content: content });
  };

    
    // Function to request browser location
  const requestBrowserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          // No need for an additional fallback here since we already have the IP location
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };
      
       // Effect to fetch IP location and set up the map
  useEffect(() => {
    axios
      .get('/api/ip-location')
      .then((response) => {
        setUserLocation(response.data);
        requestBrowserLocation(); // Request more accurate location from the browser
      })
      .catch((error) => {
        console.error('Error getting IP location:', error);
        // You can provide a default location in case IP location fails
        setUserLocation({ lat: 0, lng: 0 });
      });
  }, []);

  // Effect to initialize the map
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
     // script.onload = initMap; // Call initMap when the script is loaded
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  // Effect to add markers and borders when the map is initialized or updated
  useEffect(() => {
    if (map && markers.length) {
      const markerWindow = [];

      markers.forEach((markerData) => {
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(markerData.lat, markerData.lng),
          map: map,
        });

        const infoWindow = createInfoWindow(markerData, map);

        markerWindow.push(infoWindow);

        marker.addListener('click', () => {
          markerWindow.forEach((iw) => iw.close());
          infoWindow.open(map, marker);
        });
<<<<<<< HEAD
        shadedArea.setMap(map);
      });
    };

    
    if (!window.google || !window.google.maps) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {

      // Google Maps API loaded initialize the map
      initMap();
    }
  }, [location, borders, markers]);
=======
      });

      borders.forEach((borderPath) => {
        const borderCoordinates = borderPath.map((coord) =>
          new window.google.maps.LatLng(coord.lat, coord.lng)
        );
        const shadedArea = new window.google.maps.Polygon({
          paths: borderCoordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.04,
        });
        shadedArea.setMap(map);
      });
    }
  }, [borders, map, markers]);

  // Effect to load the Google Maps Directions API script
useEffect(() => {
  if (!window.google || !window.google.maps.DirectionsService) {
    const apiKey = process.env.REACT_APP_DIRECTION_API_KEY;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=directions&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  } else {
    initMap();
  }
}, []);
>>>>>>> d5915888b24992be404431b52bb7c2ac4a8f889f

  return <div ref={mapRef} style={{ height: '87vh', width: '100%' }} />;
};

<<<<<<< HEAD
export default Map;
=======
export default Map;
>>>>>>> d5915888b24992be404431b52bb7c2ac4a8f889f
