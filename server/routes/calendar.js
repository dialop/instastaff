// -- CALENDAR ROUTES -- //

const express = require('express');
const router = express.Router();
const { pool } = require("../lib/db");

router.get("/", (req, res) => {

  // Edit user ID with $ in query based on user cookies.
  // const userId = req.params.user_id;
  // console.log("Is it working?")

  //Hard coded for userID = 1;
  pool.query(
    `
    SELECT
      job_postings.title AS occupation,
      job_postings.date AS shift_date,
      job_postings.start_time AS start_shift,
      job_postings.duration AS duration,
      job_postings.facility_name AS facility_name,
      job_postings.facility_short_address AS address
    FROM job_postings 
    JOIN users ON users.id = job_postings.user_id 
    WHERE users.id = 1;
    `
  ).then(({ rows: calendar }) => {
    console.log("Rows", calendar);
    res.json(calendar);
  }).catch((error) => {
    console.error("Error executing SQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  });
});

module.exports = router;
