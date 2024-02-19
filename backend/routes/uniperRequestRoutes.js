// uniperRequestRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the registration route
router.post('/register', authController.registerUser);

module.exports = router;
                                                                                               