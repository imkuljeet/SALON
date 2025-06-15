const StaffAvailability = require('../models/StaffAvailability');
const Staff = require('../models/Staff');



const Service = require('../models/Service');
const ServiceAvailability = require('../models/ServiceAvailability');



// Set staff working hours

exports.setStaffHours = async (req, res) => {
  const { staffId, day, startTime, endTime } = req.body;

  try {
    // 1. Check if availability for that day exists
    let availability = await StaffAvailability.findOne({ where: { staffId, day } });

    if (availability) {
      await availability.update({ startTime, endTime });
    } else {
      availability = await StaffAvailability.create({ staffId, day, startTime, endTime });
    }

    // 2. Fetch staff info (including specialization)
    const staff = await Staff.findByPk(staffId);
    if (!staff || !staff.specialization) {
      return res.status(400).json({ error: 'Staff not found or missing specialization.' });
    }

    // 3. Find the service ID based on specialization name
    const service = await Service.findOne({ where: { name: staff.specialization } });
    if (!service) {
      return res.status(400).json({ error: 'No matching service found for staff specialization.' });
    }

    // 4. Gather all availability entries for this staff
    const allAvailabilities = await StaffAvailability.findAll({ where: { staffId } });

    const availableDays = allAvailabilities.map(a => a.day);
    const availableTimeSlots = [...new Set(allAvailabilities.map(a => a.startTime))]; // Unique start times

    // 5. Update or create ServiceAvailability
    const [serviceAvailability, created] = await ServiceAvailability.findOrCreate({
      where: { serviceId: service.id },
      defaults: {
        availableDays,
        availableTimeSlots,
      },
    });

    if (!created) {
      await serviceAvailability.update({ availableDays, availableTimeSlots });
    }

    res.status(200).json({
      message: 'Staff working hours and service availability updated successfully!',
      availability,
    });

  } catch (error) {
    console.error('Error setting staff hours:', error);
    res.status(500).json({ error: 'An error occurred while setting staff hours.' });
  }
};



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



