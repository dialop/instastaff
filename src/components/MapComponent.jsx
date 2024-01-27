// - MAP COMPONENT TO DISPLAY GOOGLE MAPS - //

import React, { useEffect, useRef } from 'react';

const MapComponent = ({ location, borders }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    window.initMap = () => {
      const mapOptions = {
        zoom: 13.4,
        center: location,
      };
      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      new window.google.maps.Marker({
        position: location,
        map: map,
      });

      // borders on the map and shade the inside area
      borders.forEach(borderPath => {
        const borderCoordinates = borderPath.map(coord => new window.google.maps.LatLng(coord.lat, coord.lng));
        const shadedArea = new window.google.maps.Polygon({
          paths: borderCoordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.04, // make the shade lighter or darker
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
  }, [location, borders]);

  return <div ref={mapRef} style={{ height: '87vh', width: '100%' }} />;
};

export default MapComponent;
