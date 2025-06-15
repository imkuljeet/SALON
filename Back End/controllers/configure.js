const StaffAvailability = require('../models/StaffAvailability');
const Staff = require('../models/Staff');


const Service = require('../models/Service');


// Set staff working hours
exports.setStaffHours = async (req, res) => {
    const { staffId, day, startTime, endTime } = req.body;

    try {
        const existingAvailability = await StaffAvailability.findOne({ where: { staffId, day } });

        if (existingAvailability) {
            await existingAvailability.update({ startTime, endTime });
            return res.status(200).json({ message: 'Staff working hours updated successfully!' });
        }

        const newAvailability = await StaffAvailability.create({ staffId, day, startTime, endTime });
        res.status(201).json({ message: 'Staff working hours set successfully!', availability: newAvailability });
    } catch (error) {
        console.error('Error setting staff hours:', error);
        res.status(500).json({ error: 'An error occurred while setting staff hours.' });
    }
};

const ServiceAvailability = require('../models/ServiceAvailability');

// Set service availability
exports.setServiceAvailability = async (req, res) => {
    const { serviceId, availableDays, availableTimeSlots } = req.body;

    try {
        const existingAvailability = await ServiceAvailability.findOne({ where: { serviceId } });

        if (existingAvailability) {
            await existingAvailability.update({ availableDays, availableTimeSlots });
            return res.status(200).json({ message: 'Service availability updated successfully!' });
        }

        const newAvailability = await ServiceAvailability.create({ serviceId, availableDays, availableTimeSlots });
        res.status(201).json({ message: 'Service availability set successfully!', availability: newAvailability });
    } catch (error) {
        console.error('Error setting service availability:', error);
        res.status(500).json({ error: 'An error occurred while setting service availability.' });
    }
};

// Fetch staff availability
exports.getStaffAvailability = async (req, res) => {
    try {
        const staffAvailability = await StaffAvailability.findAll({
            include: [{ model: Staff, attributes: ['name'] }]
        });

        res.status(200).json({ staffAvailability });
    } catch (error) {
        console.error('Error fetching staff availability:', error);
        res.status(500).json({ error: 'An error occurred while retrieving staff availability.' });
    }
};

// Fetch service availability
exports.getServiceAvailability = async (req, res) => {
    try {
        const serviceAvailability = await ServiceAvailability.findAll({
            include: [{ model: Service, attributes: ['name'] }]
        });

        res.status(200).json({ serviceAvailability });
    } catch (error) {
        console.error('Error fetching service availability:', error);
        res.status(500).json({ error: 'An error occurred while retrieving service availability.' });
    }
};



