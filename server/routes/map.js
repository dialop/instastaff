// - MAP ROUTES - //

const express = require('express');
const router = express.Router();
const { pool } = require("../lib/db");


// google maps API based on location
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

module.exports = router;