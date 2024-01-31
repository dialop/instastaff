const express = require("express");

module.exports = (pool) => {
  const router = express.Router();
  // GET api/jobs
  router.get("/", (req, res) => {
    pool.query("SELECT * FROM job_postings")
      .then((result) => res.json(result.rows))
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  return router;
};