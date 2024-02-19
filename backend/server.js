// server.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const uniperRequestRoutes = require('./routes/request');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const app = require('./app');  // Use the app instance from app.js


const router = express.Router();


router.get('/requests/logged-in-username', async (req, res) => {
    // Your logic to retrieve data based on the logged-in username
    try {
      const data = await getDataForLoggedInUser(req.user.username); // Replace with your actual logic
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to the database');

        // Listen to port after successful MongoDB connection
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Listening for requests on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Routes
app.use('/api/uniperrequest', uniperRequestRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);














// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const uniperRequestRoutes = require('./routes/request');

// const app = express();

// // Middleware for handling JSON and form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Middleware for logging
// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log('Connected to the database');

//         // Listen to port after successful MongoDB connection
//         const PORT = process.env.PORT || 4000;
//         app.listen(PORT, () => {
//             console.log(`Listening for requests on port ${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// // Routes
// app.use('/api/uniperrequest', uniperRequestRoutes);
