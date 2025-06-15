const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staff');


// POST route for sign-up
router.post('/add-staff', staffController.addStaff );
router.get('/get-staffs',staffController.getStaff);
// router.post("/login",userController.login);

module.exports = router;