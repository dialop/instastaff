const express = require('express');
const router = express.Router();
const { pool } = require('../lib/db'); // Adjust the path as needed to match your db connection setup

// Route to fetch a user's profile by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query('SELECT id, first_name, last_name, email, profile_picture FROM users WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (err) {
    console.error('Error retrieving profile:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
