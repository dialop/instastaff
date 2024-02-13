// -- USER ROUTES WITH AUTHENTICATION AND REGISTRATION -- //

const express = require('express');
const router = express.Router();

/** User Routes:
 * POST user authentication info with Auth0.
 * PUT registration info to user database.
 * PUT points to user.
 * GET user data.
 * DELETE route to remove logged in user.
 */

module.exports = (pool) => {

  // POST user authentication info with Auth0.
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

  // PUT registration info to user database.
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
      is_hero,
      is_registered,
    } = req.body;

    try {
      const updateUserQuery = `
        UPDATE users
        SET first_name = $1, last_name = $2, handle = $3, email = $4, profile_picture = $5, 
            gender = $6, occupation = $7, license = $8, points = $9, is_hero = $10, is_registered = $11
        WHERE auth0_id = $12
        RETURNING *;
      `;
      const values = [
        first_name, last_name, handle, email, profile_picture, 
        gender, occupation, license, points, is_hero, is_registered, auth0_id
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

  // PUT points to user.
  router.put('/:userId/points', async (req, res) => {
    const userId = req.params.userId; // Using userId from URL params
    const { pointsToAdd } = req.body;

    try {
      // Adjust the query to use userId for lookup instead of auth0_id
      const fetchCurrentPoints = await pool.query('SELECT points FROM users WHERE id = $1', [userId]);

      if (fetchCurrentPoints.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const currentPoints = fetchCurrentPoints.rows[0].points;
      const newPoints = currentPoints + pointsToAdd;

      const updatePointsQuery = 'UPDATE users SET points = $1 WHERE id = $2 RETURNING *;';
      const updatedUser = await pool.query(updatePointsQuery, [newPoints, userId]);

      if (updatedUser.rows.length > 0) {
        console.log("User points updated:", updatedUser.rows[0]);
        res.json(updatedUser.rows[0]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error updating user points:', err);
      res.status(500).send('Server error');
    }
  });

  // GET user data.
  router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const userQuery = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(userQuery, [userId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = result.rows[0];
      console.log('User data retrieved:', user);

      res.json({
        id: user.id,
        auth0_id: user.auth0_id,
        first_name: user.first_name,
        last_name: user.last_name,
        handle: user.handle,
        email: user.email,
        profile_picture: user.profile_picture,
        gender: user.gender,
        occupation: user.occupation,
        license: user.license,
        points: user.points,
        is_hero: user.is_hero,
        is_registered: user.is_registered,
        is_admin: user.is_admin
      });
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Server error');
    }
  });

  // DELETE route to remove a user
  router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      await pool.query('DELETE FROM users WHERE id = $1', [userId]);
      res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Server error');
    }
  });

module.exports = router;

  return router;
};
