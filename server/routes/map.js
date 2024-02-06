// - MAP ROUTES - //

const express = require('express');
const router = express.Router();
const { pool } = require("../lib/db");

router.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM job_postings');
    const jobPostings = result.rows;
    client.release();

    res.json({ mapUrl: url, jobPostings });
  } catch (error) {
    console.error("Error fetching job postings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
