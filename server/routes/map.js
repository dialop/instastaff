const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/place-details', async (req, res) => {
    const placeId = req.query.placeId;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Ensure your API key is stored in an environment variable
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;