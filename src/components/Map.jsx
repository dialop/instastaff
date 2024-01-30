import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../styles/Map.css';
import MarkerDetail from './MarkerDetail';

const Map = ({ borders, markers, userLocation }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const directionsService = useRef(null); // Add this useRef for Directions Service

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
    directionsService.current = new window.google.maps.DirectionsService(); // Initialize Directions Service
  
    // Create a blue dot marker
    const blueDotMarker = new window.google.maps.Marker({
      position: userLocation,
      map: newMap,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10, // Adjust the scale as needed
        fillColor: 'blue', // Set the fill color to blue
        fillOpacity: 1, // Set the fill opacity to 100%
        strokeWeight: 0, // Remove the stroke
      },
      title: 'IP Address Location',
    });
    // Calculate travel times and add markers here
    if (markers.length) {
      const markerWindow = [];

      markers.forEach((markerData) => {
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(markerData.lat, markerData.lng),
          map: newMap,
        });

        const infoWindow = createInfoWindow(markerData, newMap);

        markerWindow.push(infoWindow);

        marker.addListener('click', () => {
          markerWindow.forEach((iw) => iw.close());
          infoWindow.open(newMap, marker);

          // Calculate and display directions to the selected marker
          const destination = new window.google.maps.LatLng(markerData.lat, markerData.lng);
          fetchDirections(destination); // Call fetchDirections here
        });

        // Calculate travel times to each marker for car, walking, and biking
        const destination = new window.google.maps.LatLng(markerData.lat, markerData.lng);
        const origin = new window.google.maps.LatLng(userLocation.lat, userLocation.lng);

        fetchTravelTimes(origin, destination, 'driving');
        fetchTravelTimes(origin, destination, 'walking');
        fetchTravelTimes(origin, destination, 'bicycling');
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
        shadedArea.setMap(newMap);
      });
    }
  };

  // Function to create a DirectionsService instance
  const createDirectionsService = () => {
    return new window.google.maps.DirectionsService();
  };

  // Function to fetch travel times
  const fetchTravelTimes = (origin, destination, mode) => {
    const directionsService = createDirectionsService();

    const request = {
      origin: origin,
      destination: destination,
      travelMode: mode,
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        // Extract and display the duration
        const duration = result.routes[0].legs[0].duration.text;
        console.log(`Travel time by ${mode}: ${duration}`);
      } else {
        console.error(`Error calculating travel time by ${mode}: ${status}`);
      }
    });
  };

  // Function to create info windows for markers
  const createInfoWindow = (markerData, map) => {
    const content = document.createElement('div');
    const reactRoot = ReactDOM.createRoot(content);
    reactRoot.render(<MarkerDetail markerData={markerData} />);
    return new window.google.maps.InfoWindow({ content: content });
  };

  // Function to fetch and display directions
  const fetchDirections = (destination) => {
    if (!directionsService.current || !map) return;

    const request = {
      origin: userLocation,
      destination: destination,
      travelMode: 'DRIVING', // You can change the travel mode as needed (e.g., 'WALKING', 'BICYCLING')
    };

    directionsService.current.route(request, (result, status) => {
      if (status === 'OK') {
        // Display the directions on the map
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsRenderer.setDirections(result);
      } else {
        console.error(`Error calculating directions: ${status}`);
      }
    });
  };

  // Load the Google Maps Directions API script
  useEffect(() => {
    if (!window.google || !window.google.maps.DirectionsService) {
      const apiKey = process.env.REACT_APP_DIRECTION_API_KEY;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=directions&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = initMap; // Call initMap when the script is loaded
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return <div ref={mapRef} style={{ height: '87vh', width: '100%' }} />;
};

export default Map;
