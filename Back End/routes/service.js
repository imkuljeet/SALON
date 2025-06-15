const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service');
const authenticate = require('../middleware/auth'); // Import authentication middleware

// Add Service - Protected Route (Requires Authentication)
router.post('/add-service', authenticate, serviceController.addService);

// Get All Services - Protected Route (Requires Authentication)
router.get('/get-services', authenticate, serviceController.getAllServices);

module.exports = router;
