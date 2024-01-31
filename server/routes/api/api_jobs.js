const { Router } = require("express");
const router = Router();

module.exports = (pool) => {
  // GET api/jobs
  router.get("/", (req, res) => {
    return pool
      .query(
        `
        SELECT * FROM job_postings;
      `
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