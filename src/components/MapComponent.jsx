// - MAP COMONENT TO DISPLAY GOOGLE MAPS - //

import React, { useEffect, useRef } from 'react';

const MapComponent = ({ location }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        zoom: 14,
        center: location,
      };
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      new window.google.maps.Marker({
        position: location,
        map: map,
      });
    };
    if (window.google && window.google.maps) {
      initMap();
    } else {
      window.initMap = initMap;
    }
  }, [location]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default MapComponent;
