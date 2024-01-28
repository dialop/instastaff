// - MAP COMPONENT TO DISPLAY GOOGLE MAPS - //

import React, { useEffect, useRef } from 'react';
import '../styles/MapComponent.css';

const MapComponent = ({ location, borders, markers }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // initialize the map when the Google Maps API ready
    const initMap = () => {
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

      // hold all info windows
      const infoWindows = [];

      //create an info window with custom content
      const createInfoWindow = (markerData) => {
        const contentString = `
          <div class="info-window">
            <img src="${markerData.imageUrl}" alt="${markerData.title}" class="info-window-image"/>
            <h3>${markerData.title}</h3>
            <p>${markerData.description}</p>
            <div class="info-window-buttons">
              <button onclick="viewDetail('${markerData.id}')">View</button>
              <button onclick="contactSeller('${markerData.id}')">Contact</button>
              <button onclick="bookItem('${markerData.id}')">Book</button>
            </div>
          </div>
        `;

        return new window.google.maps.InfoWindow({
          content: contentString,
        });
      };

      // Add markers and their info windows to the map
      markers.forEach((markerData) => {
        // Create a marker
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(markerData.lat, markerData.lng),
          map: map,
        });

        // Create an info window
        const infoWindow = createInfoWindow(markerData);

        // Store the info window
        infoWindows.push(infoWindow);

        marker.addListener('click', () => {
          infoWindows.forEach((iw) => iw.close());
          infoWindow.open(map, marker);
        });
      });

      // borders on the map and shade the inside area
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
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {

      // Google Maps API loaded initialize the map
      initMap();
    }
  }, [
    location, 
      borders, 
      markers
    ]);

  return <div ref={mapRef} style={{ height: '87vh', width: '100%' }} />;
};

export default MapComponent;
