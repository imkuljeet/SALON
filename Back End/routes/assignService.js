const express = require('express');
const assignServiceController = require('../controllers/assignService');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Assign service to staff
router.post('/assign-service', authenticate, assignServiceController.assignServiceToStaff);

module.exports = router;
