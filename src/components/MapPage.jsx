import React from 'react';
import Map from './Map';
import CalendarComponent from './CalendarComponent'; 
import useApplicationData from '../hooks/useApplicationData';

const MapPage = () => {
  const { state, handleBookJob, getShiftForDate } = useApplicationData();

  console.log("Job Postings:", state.jobPostings);

  //center of the map based on the borders
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

  // borders of map
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

 
  const markers = state.jobPostings.map(posting => ({
    lat: parseFloat(posting.facility_latitude),
    lng: parseFloat(posting.facility_longitude),
    title: posting.title,
    description: `${posting.facility_name}\nLocation: ${posting.facility_short_address}\nShift Date: ${posting.date}\nShift Start Time: ${posting.start_time}\nShift Duration: ${posting.duration} hours`,
    imageUrl: posting.image_url,
  }));
  

  console.log(markers); 

  return (
    <div>
      <h1>Maps</h1>
      <Map
        location={location}
        borders={borders}
        markers={markers}
        onBookJob={handleBookJob}
      />
    
      <CalendarComponent
        state={state}
        handleCalendarDate={state.handleCalendarDate}
        getShiftForDate={getShiftForDate}
      />
    </div>
  );
};

export default MapPage;