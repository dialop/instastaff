import React from 'react';
import axios from 'axios';

const MapComponent = ({ location }) => {
  const [mapUrl, setMapUrl] = React.useState('');

  React.useEffect(() => {
    const fetchMap = async () => {
      const parameters = {
        center: location,
        zoom: 14,
        size: '400x400',
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      };
      const queryString = Object.keys(parameters)
        .map(key => `${key}=${encodeURIComponent(parameters[key])}`)
        .join('&');
      const url = `https://maps.googleapis.com/maps/api/staticmap?${queryString}`;
      setMapUrl(url);
    };

    fetchMap();
  }, [location]);

  return mapUrl ? <img src={mapUrl} alt="Map" /> : <p>Loading map...</p>;
};

export default MapComponent;
