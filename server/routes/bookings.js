const express = require('express');
const router = express.Router();
const { pool } = require("../lib/db");

router.post('/book-shift/:jobId', async (req, res) => {
  const { jobId } = req.params;
  const { auth0_id } = req.body; // Use Auth0 user ID to link the booking to the user

  try {
    await pool.query('BEGIN');

    const userQuery = 'SELECT * FROM users WHERE auth0_id = $1';
    const userResult = await pool.query(userQuery, [auth0_id]);

    if (userResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).send('User not found.');
    }

    const userId = userResult.rows[0].id;

    // job_postings table to mark the shift as booked by the user
    const bookShiftQuery = `
      UPDATE job_postings
      SET is_filled = TRUE, booked_by_user_id = $1
      WHERE id = $2 AND is_filled = FALSE
      RETURNING *;`;

    const bookShiftResult = await pool.query(bookShiftQuery, [userId, jobId]);

    // If no row updated, shift  filled or does not exist
    if (bookShiftResult.rowCount === 0) {
      await pool.query('ROLLBACK');
      return res.status(409).send('Shift is already booked or does not exist.');
    }

    // Fetch  updated shifts for the user using the user's database ID
    const shiftsForUserQuery = `
      SELECT * FROM job_postings
      WHERE booked_by_user_id = $1;`;

    const updatedShiftsForUser = await pool.query(shiftsForUserQuery, [userId]);

    await pool.query('COMMIT');

    res.json(updatedShiftsForUser.rows);
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error booking shift:', error);
    res.status(500).send('Error booking shift');
  }
});
module.exports = router;


