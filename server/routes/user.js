const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  
  // POST to insert new user.
  // separate out another user.
  // user root route 
  router.post('/', async (req, res) => {
    console.log(req.body);
    
    const { email, first_name, last_name } = req.body;
  
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
        INSERT INTO users (email, first_name, last_name)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const newUser = await pool.query(insertQuery, [email, first_name, last_name]);
      res.status(201).json(newUser.rows[0]);
    } catch (err) {
      console.error('Error handling user data:', err);
      res.status(500).send('Server error');
    }
  });
  
  return router;
};
