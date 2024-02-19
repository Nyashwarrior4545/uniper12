// app.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const uniperRequestRoutes = require('./routes/request');
const app = express();


// Middleware for handling JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for logging
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log(err);
    });

// Routes
app.use('/api/uniperrequest', uniperRequestRoutes);

module.exports = app;
