const express = require('express');
const router = express.Router();

module.exports = (pool) => {

  // POST to create new user from Auth0 sign-up.
  router.post('/', async (req, res) => {
    console.log(req.body);
    
    const { 
      auth0_id,
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
        INSERT INTO users (auth0_id, email, first_name, last_name, profile_picture)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const newUser = await pool.query(insertQuery, 
        [auth0_id, email, first_name, last_name, profile_picture]);
      res.status(201).json(newUser.rows[0]);
    } catch (err) {
      console.error('Error handling user data:', err);
      res.status(500).send('Server error');
    }
  });

  // PUT to update existing user from Auth0 id.
  router.put('/update', async (req, res) => {
    const { 
      auth0_id, 
      email, 
      first_name, 
      last_name, 
      profile_picture, 
      gender, 
      occupation, 
      license, 
      isHero,
      handle
    } = req.body;

    try {
      const updateUserQuery = `
        UPDATE users
        SET email = $1, first_name = $2, last_name = $3, profile_picture = $4, 
            gender = $5, occupation = $6, license = $7, isHero = $8, handle = $9
        WHERE auth0_id = $10
        RETURNING *;
      `;
      const values = [
        email, first_name, last_name, profile_picture, 
        gender, occupation, license, isHero, handle, auth0_id
      ];
      const result = await pool.query(updateUserQuery, values);

      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error updating user data:', err);
      res.status(500).send('Server error');
    }
  });

  // GET user information by Auth0 ID
  router.get('/profile/:auth0_id', async (req, res) => {
    const { auth0_id } = req.params;

    try {
      const userQuery = 'SELECT * FROM users WHERE auth0_id = $1';
      const userResult = await pool.query(userQuery, [auth0_id]);

      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = userResult.rows[0];
      res.json({
        first_name: user.first_name,
        last_name: user.last_name,
        handle: user.handle,
        email: user.email,
        profile_picture: user.profile_picture,
        gender: user.gender,
        occupation: user.occupation,
        license: user.license,
        isHero: user.ishero,
        points: user.points,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Server error');
    }
  });

  return router;
};
