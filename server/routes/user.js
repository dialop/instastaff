const express = require('express');
const router = express.Router();

module.exports = (pool) => {

  // POST to create new user
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

  // GET user data by ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const userData = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      res.json(userData.rows[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Server error');
    }
  });

  // POST update user data by ID
  router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;

    // Construct the update query with all fields that can be updated
    const updateQuery = `
      UPDATE users
      SET first_name = $1, last_name = $2, email = $3 /*, ...rest of the user fields */
      WHERE id = $4
      RETURNING *;
    `;

    try {
      const updatedUser = await pool.query(updateQuery, [first_name, last_name, email, id]);
      res.json(updatedUser.rows[0]);
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).send('Server error');
    }
  });

  return router;
};
