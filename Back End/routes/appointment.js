const express = require('express');
const router = express.Router();
const serviceAvailabilityController = require('../controllers/appointment');
const authenticate = require('../middleware/auth');

// Define static routes first
router.get('/upcoming', authenticate, serviceAvailabilityController.getUpcomingssAppointments);
router.get('/check-service-booked/:serviceId', authenticate, serviceAvailabilityController.checkIfServiceBooked);
router.post('/book', authenticate, serviceAvailabilityController.bookAppointment);

// Keep dynamic route at the bottom
router.get('/:serviceId', authenticate, serviceAvailabilityController.getServiceAvailabilityByServiceId);

module.exports = router;
