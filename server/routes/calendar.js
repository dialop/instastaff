// -- ROUTER FOR CALENDAR API -- //

const express = require('express');
const router = express.Router();
const { pool } = require("../lib/db");

router.get("/api/calendar", async (req, res) => {
  const userId = req.user ? req.user.id : null;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID is missing or not authenticated." });
  }

  try {
    // Query to fetch calendar data (booked shifts) for the authenticated user
    const queryText = `
      SELECT
        job_postings.title AS occupation,
        job_postings.date AS shift_date,
        job_postings.start_time AS start_shift,
        job_postings.duration,
        job_postings.facility_name,
        job_postings.facility_short_address AS address
      FROM job_postings
      JOIN users ON users.id = job_postings.booked_by_user_id
      WHERE users.id = $1;
    `;
    const { rows: calendarEntries } = await pool.query(queryText, [userId]);

    // calendar entries to the client
    res.json(calendarEntries);
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
