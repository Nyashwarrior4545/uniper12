//request.js

const express = require('express');
const {
  getRequests,
  getRequest,
  createRequest,
  deleteRequest,
  updateRequest,
} = require("../controller/request_Controller");

const router = express.Router();

// GET all requests
router.get('/', getRequests);

// GET a single request
router.get('/:id', getRequest);

// POST a new request
router.post('/', createRequest);

// DELETE a request
router.delete('/:id', deleteRequest);

// UPDATE a request
router.patch('/:id', updateRequest);

module.exports = router;
