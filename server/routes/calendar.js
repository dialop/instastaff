// - Calendar ROUTES - //

const express = require('express');
const router = express.Router();

/* GET Shifts by Calendar */
module.exports = (db) => {
  router.get("/calendar", (req, res) => {
    //Edit user ID with $ in quary based on user cookies.
    // const userId = req.params.user_id;
    db.query(
      `
    SELECT
    job_postings.title AS occupation,
    job_postings.date AS shift_date,
    job_postings.start_time AS start_shift,
    job_postings.duration AS duration,
    job_postings.facility_name AS facility_name,
    job_postings.facility_short_address AS address
    FROM job_postings 
    JOIN users
    ON users.id = job_postings.user_id 
    WHERE users.id = 1;
    `
    ).then(({ rows: calendar }) => {
      response.json(calendar);
    });
  });
  return router;
};
