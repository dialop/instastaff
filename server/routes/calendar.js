// -- ROUTER FOR CALENDAR API -- //

const express = require('express');
const router = express.Router();
const { pool } = require("../lib/db");

router.get("/:user_id", (req, res) => {

  // Edit user ID with $ in query based on user cookies.
  const userId = req.params.user_id;
  // console.log("Is it working?")

  //Hard coded for userID = 1;
  pool.query(
    `
    SELECT
    job_postings.id AS job_id,
      job_postings.title AS occupation,
      job_postings.date AS shift_date,
      job_postings.start_time AS start_shift,
      job_postings.duration AS duration,
      job_postings.facility_name AS facility_name,
      job_postings.facility_short_address AS address
    FROM job_postings 
    JOIN users ON users.id = job_postings.booked_by_user_id
    WHERE job_postings.booked_by_user_id = $1;
    `, [userId]
  ).then(({ rows: calendar }) => {
    res.json(calendar);
  }).catch((error) => {
    console.error("Error executing SQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }); 
});

module.exports = router;
