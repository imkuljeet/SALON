const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const authenticate = require('../middleware/auth'); // Import authentication middleware

// Get All Customers - Protected Route (Requires Authentication)
router.get('/get-allcustomers', authenticate, customerController.getCustomers);

module.exports = router;
