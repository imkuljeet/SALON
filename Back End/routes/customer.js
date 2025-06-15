const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer');

// POST route to add a service
router.get('/get-allcustomers', customerController.getCustomers);



module.exports = router;
