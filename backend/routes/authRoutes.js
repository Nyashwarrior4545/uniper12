// routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt library
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authMiddleware');
const User = require('../models/user_model');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password, userType } = req.body;

    // Check for existing user, etc.

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const user = new User({ username, password: hashedPassword, userType });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id.toString() }, 'your_secret_key');

    // Respond with user and token
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
  
// Login a user
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      // If the password is correct, create a JWT token
      const token = jwt.sign({ _id: user._id.toString() }, 'your_secret_key');
  
      // Respond with the user and the token
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;
