// - MAP COMPONENT TO DISPLAY GOOGLE MAPS - //

import React, { useEffect, useRef } from 'react';

const MapComponent = ({ location, borders, markers }) => { // Assume markers is an array of { lat, lng }
  const mapRef = useRef(null);

 useEffect(() => {
    window.initMap = () => {
      const mapOptions = {
        zoom: 13.4,
        center: location,
        styles: [
          { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill'
          },
          {
            featureType: 'poi',
            elementType: 'geometry'
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry'
          },
          {
            featureType: 'road',
            elementType: 'geometry'
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill'
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry'
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill'
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
          },
          {
            featureType: 'water',
            elementType: 'geometry'
          },
          
        ],
      };
      const map = new window.google.maps.Map(mapRef.current, mapOptions);


      
      // Add markers to the map
      markers.forEach((markerData) => {
        new window.google.maps.Marker({
          position: new window.google.maps.LatLng(markerData.lat, markerData.lng),
          map: map,
          // Optionally, you can add custom icons or other marker options here
        });
      });

      // Draw the borders on the map and shade the inside area
      borders.forEach(borderPath => {
        const borderCoordinates = borderPath.map(coord => new window.google.maps.LatLng(coord.lat, coord.lng));
        const shadedArea = new window.google.maps.Polygon({
          paths: borderCoordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.04, // Adjust fillOpacity to make the shade lighter or darker
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
      window.initMap();
    }
  }, [location, borders, markers]); // Ensure markers are included in the dependency array

  return <div ref={mapRef} style={{ height: '87vh', width: '100%' }} />;
};

export default MapComponent