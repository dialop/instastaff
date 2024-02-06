// api/email_notification.js

const express = require('express');


require('dotenv').config();


module.exports = (pool) => {
  const router = express.Router();
  // Route to send an email notification
  router.post('/book-job/:id', async (req, res) => {
    const jobId = req.params.id;
    const userId = req.body.user_id;
    
    const {date} = await pool.query('SELECT * FROM job_postings WHERE id = $1;', [jobId])

    // double check, if the user already has this booking in the calendar table, cause otherwise you will double book, so make a query to select with these params and if it's not there then insert but if it is, just return it or res.send a message saying you have already booked it
    const data = await pool.query('Insert into calendar (user_id, job_posting_id, date) values($1, $2, $3) RETURNING *;', [userId, jobId, date])
    console.log(data.rows[0]);

    res.send(data.rows[0])

  });

  return router;
}



