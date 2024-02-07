const express = require("express");
const router = express.Router();
const { pool } = require("../lib/db");

router.post('/', (req, res) => {
  console.log('Received POST request to /post-shift');
 const formData = req.body.formData
  console.log(req.body);
  pool.query(
    `
      SELECT facility_short_address, facility_latitude, facility_longitude
      FROM job_postings
      WHERE facility_name = $1;
      `,
    [formData.facility_name],
    (error, result) => {
      if (error) {
        console.error('Failed to fetch address:', error.message);
      } else {
        const addressInfo = result.rows[0];




        pool.query(
          `
            INSERT INTO job_postings (facility_name, title, rate, gender, duration, date, start_time,
              facility_short_address, facility_latitude, facility_longitude
              )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
            `,
            [
              formData.facility_name,
              formData.title,
              formData.rate,
              formData.gender,
              formData.duration,
              formData.date,
              formData.start_time,
              addressInfo.facility_short_address,
              addressInfo.facility_latitude,
              addressInfo.facility_longitude,
            ],
            (insertError, insertResult) => {
              if (insertError) {
                console.error('Failed to insert:', insertError.message);
                res.status(500).json({ error: 'Failed to insert data into the database' });
              } else {
                const insertedRow = insertResult.rows[0];
                console.log('Result New Shift:', insertedRow);
                res.status(201).json({ message: 'Shift posted successfully', shift: insertedRow });
              }
            }
          );
        }
      }
    );
  })
  
  module.exports = router;
