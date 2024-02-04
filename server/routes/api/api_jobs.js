const express = require("express");

module.exports = (pool) => {
  const router = express.Router();
  
  // PUT api/jobs
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body
    const is_filled = req.body.is_filled;
    console.log("***************************This is the is_filled value from the server", is_filled)
    console.log("***************************This is the body", body)
    return pool
    .query(
      "UPDATE job_postings SET is_filled = $1 where id = $2 returning *",
      [
        is_filled, id
      ]
      )
      .then((result) => {
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