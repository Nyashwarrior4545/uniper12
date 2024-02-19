//request_Controller
const express = require('express');
const router = express.Router();
const Request_big = require('../models/request_model');
const mongoose = require('mongoose');
const authenticateUser = require('../middleware/authMiddleware'); // Import your authentication middleware


// ... (existing code)

// get all request
const getRequests = async (req, res) => {
    const requests = await Request_big.find({}).sort({ createdAt: -1 });

    res.status(200).json(requests);
}

// get a single request
const getRequest = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Request" });
    }
    const request = await Request_big.findById(id);

    if (!request) {
        return res.status(404).json({ error: "No such Request" });
    }

    res.status(200).json(request);
}

// create a new request
const createRequest = async (req, res) => {
    const { request_Name, Category, Status, senderUsername } = req.body;
    
    // Ensure that senderUsername is correctly set
    console.log('Received Request Data:', req.body);

    let emptyFields = [];

    if (!request_Name) {
        emptyFields.push('request_Name');
    }
    if (!Category) {
        emptyFields.push('Category');
    }
    if (!Status) {
        emptyFields.push('Status');
    }
    if (!senderUsername) {
        emptyFields.push('senderUsername');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    try {
        const request = await Request_big.create({
            request_Name,
            Category,
            Status,
            senderUsername, // Include senderUsername in the request creation
        });

        res.status(200).json(request);
    } catch (error) {
        console.error('Error creating request:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// delete a workout
const deleteRequest = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Request" });
    }

    const request = await Request_big.findOneAndDelete({ _id: id });

    if (!request) {
        return res.status(404).json({ error: "No such Request" });
    }

    res.status(200).json(request);
}

// update a new workout
const updateRequest = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Request' });
    }

    try {
        const updatedRequest = await Request_big.findByIdAndUpdate(
            id,
            { $set: { Status: req.body.Status } }, // Update only the "Status" field
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ error: 'No such Request' });
        }

        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

router.get('/requests/:username', async (req, res) => {
    const { username } = req.params;
  
    try {
      const requests = await Request_big.find({ senderUsername: username }).sort({ createdAt: -1 });
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/createRequest', authenticateUser, createRequest);
  
module.exports = router;
module.exports = {
    getRequests,
    getRequest,
    createRequest,
    deleteRequest,
    updateRequest,
};
