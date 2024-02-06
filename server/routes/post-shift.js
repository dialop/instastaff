const express = require("express");
  const router = express.Router();
  const { pool } = require("../lib/db");
  require('dotenv').config();

  console.log('are you working?');

  router.post('/', (req, res) => {
    console.log('Received POST request to /post-shift');
    const { formData} = req.body;
    console.log(req.body);
    
    // Get address information for the facility from Post shift
    pool.query(
      `
      SELECT facility_name, facility_short_address, facility_latitude, facility_longitude
      FROM job_postings
      WHERE facility_name = $1;
      `,
      [formData.facility],
      (error, result) => {
        if (error) {
          console.error('Failed to fetch address:', error.message);
        } else {
          const addressInfo = result.rows[0];
    

          pool.query(
            `
            INSERT INTO job_postings (facility_name, title, rate, gender, duration, date, start_time,
              facility_short_address, facility_latitude, facility_longitude, available_to_choose, is_filled)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, TRUE, FALSE)
            RETURNING *;
            `,
            [
              formData.facility,
              formData.workerType,
              formData.rate,
              formData.gender,
              formData.duration,
              formData.startDate,
              formData.startTime,
              addressInfo.facility_short_address,
              addressInfo.facility_latitude,
              addressInfo.facility_longitude,
            ],
            (insertError, insertResult) => {
              if (insertError) {
                console.error('Failed to insert:', insertError.message);
              } else {
                const insertedRow = insertResult.rows[0];
                console.log('Inserted Row with Address Information:', insertedRow);
              }
            }
          );
        }
      }
    );
  })
  
  module.exports = router;
