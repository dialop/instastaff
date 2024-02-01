// - MAP COMPONENT TO DISPLAY GOOGLE MAPS - //

import React, { useEffect, useRef, useState } from 'react';
import MarkerDetail from './MarkerDetail'; 
import ReactDOM from 'react-dom'; 
import '../styles/Map.css';

const Map = ({ location, borders, markers }) => {
  const mapRef = useRef(null);
  const [markerWindow, setMarkerWindow] = useState([]);

  useEffect(() => {
    const initMap = () => {
      console.log("Initializing the map...");
      const mapOptions = {
        zoom: 13.4,
        center: location,
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

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      const createInfoWindow = (markerData) => {
        const content = document.createElement('div');
        ReactDOM.render(<MarkerDetail markerData={markerData} />, content);

        return new window.google.maps.InfoWindow({
          content: content,
        });
      };

      markers.forEach((markerData) => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: parseFloat(markerData.lat),
            lng: parseFloat(markerData.lng)
          },
          map: map,
          title: markerData.title
        });
      
        const infoWindow = createInfoWindow(markerData);

        setMarkerWindow((prevWindows) => [...prevWindows, infoWindow]);

        marker.addListener('click', () => {
          markerWindow.forEach((iw) => iw.close());
          infoWindow.open(map, marker);
        });
      });

      // Borders on the map and shade the inside area
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
    };

    if (!window.google || !window.google.maps) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.addEventListener('load', initMap);
    } else {

      initMap();
    }
  }, [location, borders, markers]);

  return <div ref={mapRef} style={{ height: '87vh', width: '100%' }} />;
};

export default Map;
