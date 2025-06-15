const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service');

// POST route to add a service
router.post('/add-service', serviceController.addService);

// GET route to fetch all services
router.get('/get-services', serviceController.getAllServices);

module.exports = router;
