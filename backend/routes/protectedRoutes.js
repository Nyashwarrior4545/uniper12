// routes/protectedRoutes.js

const express = require('express');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route example
router.get('/profile', authenticateUser, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
