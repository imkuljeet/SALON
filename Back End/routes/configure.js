const express = require('express');
// const staffController = require('../controllers/staff');
// const serviceController = require('../controllers/service');
const configureController = require('../controllers/configure');
const authenticate = require('../middleware/auth'); // Middleware for token authentication

const router = express.Router();

// Staff Routes
router.post('/set-hours', authenticate, configureController.setStaffHours);
// router.get('/staff/get-staffs', authenticate, staffController.getAllStaff);

// Service Routes
router.post('/set-availability', authenticate, configureController.setServiceAvailability);
// router.get('/service/get-all', authenticate, serviceController.getAllServices);

// Staff Availability Route
router.get('/get-availability', authenticate, configureController.getStaffAvailability);

// Service Availability Route
router.get('/get-service-availability', authenticate, configureController.getServiceAvailability);


module.exports = router;
