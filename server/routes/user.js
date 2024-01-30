const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  
  // POST to insert new user.
  router.post('/user', async (req, res) => {
    const { email, first_name, last_name } = req.body;

    const insertQuery = `
      INSERT INTO users (email, first_name, last_name)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `;

    try {
      const result = await pool.query(insertQuery, [email, first_name, last_name]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error handling user data:', err);
      res.status(500).send('Server error');
    }
  });

  return router;
};
