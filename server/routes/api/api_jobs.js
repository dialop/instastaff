const express = require("express");

module.exports = (pool) => {
  const router = express.Router();

  //SEARCH - api/jobs/search
router.get('/search', (req, res) => {
  const {facility_name, title, gender, date } = req.query;
  let baseQuery = `SELECT * FROM job_postings WHERE 1=1`; 
  let queryParams = [];
  let queryIndex = 1;

  if (facility_name) {
      baseQuery += ` AND facility_name ILIKE $${queryIndex++}`;
      queryParams.push(`%${facility_name}%`);
  }
  if (title) {
    baseQuery += ` AND title ILIKE $${queryIndex++}`;
    queryParams.push(`%${title}%`);
  }
  if (gender) {
    baseQuery += ` AND gender ILIKE $${queryIndex++}`;
    queryParams.push(`%${gender}%`);
  }
  if (date) {
      baseQuery += ` AND date = $${queryIndex++}`;
      queryParams.push(date);
  }

  console.log(baseQuery, queryParams)

  pool.query(baseQuery, queryParams)
      .then(result => {
        return res.json(result.rows);
      })
      .catch(err => {
          console.error(err);
          res.status(500).send('Server error');
      });
});

  
  // PUT api/jobs
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body
    const { is_filled, booked_by_user_id } = req.body;
    console.log('req.body', req.body);
    // const is_filled = req.body.is_filled;
    return pool
    .query(
      //update user ID
      "UPDATE job_postings SET is_filled = $1, booked_by_user_id = $2 WHERE id = $3 RETURNING *",
      [is_filled, booked_by_user_id, id]
    )
      // "UPDATE job_postings SET is_filled = $1 where id = $2 returning *",
      // [
      //   is_filled, id
      // ]
      // )
      .then((result) => {
        console.log('data from backend booking', result.rows);
        return res.json(result.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  
// GET api/jobs
router.get("/", (req, res) => {
  pool.query(`
    SELECT * FROM job_postings
  `)
  .then((result) => res.json(result.rows))
  .catch((err) => res.status(500).json({ error: err.message }));
});


  router.get("/:id", (req, res) => {
    const id = req.params.id;
    return pool
      .query(
        `
          SELECT * FROM job_postings where id = $1;
        `, [id]
      )
      .then((result) => {
        return res.json(result.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });



  return router;
};