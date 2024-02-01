const express = require("express");

module.exports = (pool) => {
  const router = express.Router();
  // GET api/jobs
  router.get("/", (req, res) => {
    pool.query("SELECT * FROM job_postings")
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