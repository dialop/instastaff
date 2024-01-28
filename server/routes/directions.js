// server/routes/directions.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/calculateTravelTimes', async (req, res) => {
  const { originLat, originLng, destLat, destLng } = req.query;
  const apiKey = process.env.DIRECTIONS_API_KEY;

  const modes = ['driving', 'walking', 'bicycling'];

  try {
    const travelTimes = {};

    for (const mode of modes) {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin: `${originLat},${originLng}`,
          destination: `${destLat},${destLng}`,
          mode: mode,
          key: apiKey,
        },
      });

      if (response.data.status === 'OK') {
        const duration = response.data.routes[0].legs[0].duration.text;
        travelTimes[mode] = duration;
      } else {
        console.error('Error fetching directions:', response.data.status);
      }
    }

    res.json(travelTimes);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
