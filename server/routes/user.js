const express = require('express');
const router = express.Router();

/* User Routes:
  1. POST to authenticate user with Auth0.
  2. PUT to complete user registration from form.
*/

module.exports = (pool) => {

  // POST to authenticate user with Auth0.
  router.post('/', async (req, res) => {
    console.log(req.body);
    
    const { 
      auth0_id,
      first_name, 
      last_name, 
      email, 
      profile_picture 
    } = req.body;

    try {
      // TODO: use window.SessionStorage instead.
      // Check if user already exists.
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE auth0_id = $1;',
        [auth0_id]
      );

      if (existingUser.rows.length > 0) { 
        console.log("Existing user verified:", existingUser.rows[0]);
        return res.send(existingUser.rows[0]);
      }

      // Insert new user from Auth0 into db.
      const insertQuery = `
        INSERT INTO users (auth0_id, first_name, last_name, email, profile_picture)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const newUser = await pool.query(insertQuery, 
        [auth0_id, first_name, last_name, email, profile_picture]);
        console.log("New user to db:", newUser.rows[0]);
      res.status(201).json(newUser.rows[0]);
    } catch (err) {
      console.error('Error handling user data:', err);
      res.status(500).send('Server error');
    }
  });

  // PUT to complete user registration from form.
  router.put('/update', async (req, res) => {
    const { 
      auth0_id,
      first_name, 
      last_name,
      handle,
      email, 
      profile_picture, 
      gender, 
      occupation, 
      license,
      points, 
      isHero,
      isRegistered
    } = req.body;

    try {
      const updateUserQuery = `
        UPDATE users
        SET first_name = $1, last_name = $2, handle = $3, email = $4, profile_picture = $5, 
            gender = $6, occupation = $7, license = $8, points = $9, isHero = $10, isRegistered = $11
        WHERE auth0_id = $12
        RETURNING *;
      `;
      const values = [
        first_name, last_name, handle, email, profile_picture, 
        gender, occupation, license, points, isHero, isRegistered, auth0_id
      ];
      const result = await pool.query(updateUserQuery, values);

      if (result.rows.length > 0) {
        res.json(result.rows[0]);
        console.log("User registration complete:", result.rows[0]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error updating user data:', err);
      res.status(500).send('Server error');
    }
  });

  // TODO: GET to grab the collected user information.
  router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const userQuery = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(userQuery, [userId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = result.rows[0];
      res.json({
        id: user.id,
        auth0_id: user.auth0_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_picture: user.profile_picture,
        gender: user.gender,
        occupation: user.occupation,
        license: user.license,
        isHero: user.isHero,
        handle: user.handle,
      });
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Server error');
    }
  });

  return router;
};
