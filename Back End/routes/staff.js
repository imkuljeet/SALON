const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff');
const authenticate = require('../middleware/auth'); // Import authentication middleware

// Add Staff - Protected Route (Requires Authentication)
router.post('/add-staff', authenticate, staffController.addStaff);

// Get All Staff Members - Protected Route (Requires Authentication)
router.get('/get-staffs', authenticate, staffController.getStaff);

module.exports = router;
