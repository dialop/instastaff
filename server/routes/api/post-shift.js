const express = require("express");
  const router = express.Router();
  // const { pool } = require("../lib/db");
  require('dotenv').config();

  console.log('are you working?');

  router.post('/post-shift', (req, res) => {
    console.log('Received POST request to /post-shift');
    const { formData} = req.body;
    console.log(req.body);
    return pool
    .query(
      `INSERT INTO job_postings (facility_name, type_of_worker, rate, gender, duration, date, start_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
    [formData.facility, 
      formData.workerType,
      formData.rate,
      formData.gender,
      formData.duration,
      formData.startDate,
      formData.startTime,
    ]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(`Failed to add`);
    });
  })
  


  module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { pool } = require("../lib/db");
// require('dotenv').config();

// console.log('are you working?');

// router.post('/post-shift', async (req, res) => {
//   try {
//     console.log('Received POST request to /post-shift');

//     // Ensure that all required fields are present
//     const requiredFields = ['facility', 'address', 'workerType', 'rate', 'gender', 'duration', 'startDate', 'startTime', 'latitude', 'longitude'];
//     if (!requiredFields.every(field => req.body.formData[field] !== undefined)) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const { formData, latitude, longitude } = req.body;

//     const result = await pool.query(
//       `INSERT INTO job_postings (facility_name, facility_short_address, type_of_worker, rate, gender, duration, date, start_time, facility_latitude, facility_longitude)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
//       [
//         formData.facility,
//         formData.address,
//         formData.workerType,
//         formData.rate,
//         formData.gender,
//         formData.duration,
//         formData.startDate,
//         formData.startTime,
//         formData.latitude,
//         formData.longitude
//       ]
//     );

//     return res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error('Error handling POST request:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
