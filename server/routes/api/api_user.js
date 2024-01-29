const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  router.post('/users', async (req, res) => {
    const { email, first_name, last_name } = req.body;

    const insertQuery = `
      INSERT INTO users (email, first_name, last_name, handle, profile_picture, gender, occupation, license, points, badge_id, last_login, token)
      VALUES ($1, $2, $3, '', '', '', '', '', 0, NULL, CURRENT_TIMESTAMP, '')
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
