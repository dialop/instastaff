const express = require('express');
const router = express.Router();

module.exports = (pool) => {

  // POST to create new user from Auth0 sign-up.
  router.post('/', async (req, res) => {
    console.log(req.body);
    
    const { 
      email, 
      first_name, 
      last_name, 
      profile_picture 
    } = req.body;

    try {
      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Insert new user
      const insertQuery = `
        INSERT INTO users (email, first_name, last_name, profile_picture)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const newUser = await pool.query(insertQuery, 
        [email, first_name, last_name, profile_picture]);
      res.status(201).json(newUser.rows[0]);
    } catch (err) {
      console.error('Error handling user data:', err);
      res.status(500).send('Server error');
    }
  });

  return router;
};
