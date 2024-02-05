import React, { useEffect, useRef, useState } from 'react';
import MarkerDetail from './MarkerDetail';
import ReactDOM from 'react-dom';
import '../styles/Map.css';

const Map = ({ location, borders, markers, origin, destination, viewJobDetails }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markerWindow, setMarkerWindow] = useState([]);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

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
      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
      newDirectionsRenderer.setMap(newMap);
      setDirectionsRenderer(newDirectionsRenderer);

      markers.forEach((markerData) => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: parseFloat(markerData.lat),
            lng: parseFloat(markerData.lng),
          },
          map: newMap,
          title: markerData.title,
        });

        const infoWindow = createInfoWindow(markerData);

        marker.addListener('click', () => {
          markerWindow.forEach((iw) => iw.close());
          infoWindow.open(newMap, marker);
        });
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

      if (origin && destination) {
        calculateAndDisplayRoute(newDirectionsRenderer, origin, destination);
      }
    };

    const createInfoWindow = (markerData) => {
      const content = document.createElement('div');
      ReactDOM.render(<MarkerDetail markerData={markerData} viewJobDetails={viewJobDetails} />, content);
      return new window.google.maps.InfoWindow({ content: content });
    };

    const calculateAndDisplayRoute = (directionsRenderer, origin, destination) => {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          const route = response.routes[0].legs[0];
          displayRouteInfo(route.distance.text, route.duration.text);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    };

    const displayRouteInfo = (distance, duration) => {
      console.log(`Distance: ${distance}, Duration: ${duration}`);
    };

    if (!window.google || !window.google.maps) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      window.initMap = initMap;
    } else {
      initMap();
    }

    return () => {
      window.initMap = null;
    };
  }, [location, borders, markers, origin, destination]);

  return <div ref={mapRef} style={{ height: '87vh', width: '100%' }} />;
};

export default Map;