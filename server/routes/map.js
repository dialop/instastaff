// - MAP ROUTES - //

const express = require('express');
const geoip = require('geoip-lite');
const router = express.Router();

// Generates Google Maps API based on location
router.get('/map', (req, res) => {
  const { location } = req.query;
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

  res.json({ mapUrl: url });
});

// New /ip-location route for IP-based geolocation
router.get('/ip-location', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);
  if (geo) {
    res.json({ lat: geo.ll[0], lng: geo.ll[1] });
  } else {
    res.status(404).send('Location not found');
  }
});





module.exports = router;