const express = require('express');
const router = express.Router();

router.get('/map', (req, res) => {
  const { location } = req.query;
  const parameters = {
    center: location,
    zoom: 14,
    size: '400x400',
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const queryString = Object.keys(parameters)
    .map(key => `${key}=${encodeURIComponent(parameters[key])}`)
    .join('&');
  const url = `https://maps.googleapis.com/maps/api/staticmap?${queryString}`;

  res.json({ mapUrl: url });
});

module.exports = router;