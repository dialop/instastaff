const express = require('express');
require('dotenv').config();

module.exports = (pool) => {
  const router = express.Router();
  
  // Route to send an email notification
  router.post('/book-shift/:jobId', async (req, res) => {
    const { jobId } = req.params;
    const { userId } = req.body; // Use the user ID directly instead of Auth0 ID
    
    try {
      await pool.query('BEGIN');
    
      // Retrieve user details based on userId
      const userQuery = 'SELECT * FROM users WHERE id = $1';
      const userResult = await pool.query(userQuery, [userId]);
      if (userResult.rows.length === 0) {
        await pool.query('ROLLBACK');
        return res.status(404).json({ message: 'User not found.' });
      }
    
      // Check if the job posting is available (not filled)
      const checkShiftQuery = 'SELECT * FROM job_postings WHERE id = $1 AND is_filled = FALSE';
      const checkShiftResult = await pool.query(checkShiftQuery, [jobId]);
      if (checkShiftResult.rows.length === 0) {
        await pool.query('ROLLBACK');
        return res.status(409).json({ message: 'Shift is already booked or does not exist.' });
      }
    
      // Mark the job posting as filled and book the shift
      const bookShiftQuery = 'UPDATE job_postings SET is_filled = TRUE, booked_by_user_id = $1 WHERE id = $2 RETURNING *';
      const bookShiftResult = await pool.query(bookShiftQuery, [userId, jobId]);
    
      // Insert the booked job into the calendar table
      const shift = bookShiftResult.rows[0];
      const insertCalendarQuery = 'INSERT INTO calendar (user_id, job_posting_id, date) VALUES ($1, $2, $3) RETURNING *';
      const calendarResult = await pool.query(insertCalendarQuery, [userId, jobId, shift.date]);
    
      await pool.query('COMMIT');
    
      res.json({
        bookedShift: shift,
        calendarEntry: calendarResult.rows[0]
      });
    } catch (error) {
      await pool.query('ROLLBACK');
      console.error('Error booking shift:', error);
      res.status(500).json({ message: 'Error booking shift' });
    }
  });

  return router;
};


//Alvin 

// const jobId = req.params.id;
// const userId = req.body.user_id;

// const {date} = await pool.query('SELECT * FROM job_postings WHERE id = $1;', [jobId])

// // double check, if the user already has this booking in the calendar table, cause otherwise you will double book, so make a query to select with these params and if it's not there then insert but if it is, just return it or res.send a message saying you have already booked it
// const data = await pool.query('Insert into calendar (user_id, job_posting_id, date) values($1, $2, $3) RETURNING *;', [userId, jobId, date])
// console.log(data.rows[0]);

// res.send(data.rows[0])}
