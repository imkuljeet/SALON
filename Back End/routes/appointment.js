const express = require('express');
const router = express.Router();
const serviceAvailabilityController = require('../controllers/appointment');
const authenticate = require('../middleware/auth');

router.get('/:serviceId', authenticate ,serviceAvailabilityController.getServiceAvailabilityByServiceId);
router.post('/book',authenticate,serviceAvailabilityController.bookAppointment);

module.exports = router;
