const ServiceAvailability = require('../models/ServiceAvailability');
const Service = require('../models/Service');

// const { Appointment, User, Service, Staff, StaffAvailability } = require('../models');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Staff = require('../models/Staff');
const StaffAvailability = require('../models/StaffAvailability');
const { Op } = require('sequelize');

//-------------------------

// const { Op } = require('sequelize');
// const Service = require('../models/Service');
// const ServiceAvailability = require('../models/ServiceAvailability');
// const Staff = require('../models/Staff');
// const StaffAvailability = require('../models/StaffAvailability');

exports.getServiceAvailabilityByServiceId = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found." });
    }

    const availability = await ServiceAvailability.findOne({ where: { serviceId } });
    if (!availability) {
      return res.status(404).json({ error: "No availability data found for this service." });
    }

    const { availableDays } = availability;

    // Get staff who provide this service AND are available on the relevant days
    const staff = await Staff.findAll({
      include: [
        {
          association: Staff.associations.Services, // must be declared in model setup
          where: { id: serviceId },
          through: { attributes: [] },
        },
        {
          model: StaffAvailability,
          where: {
            day: { [Op.in]: availableDays },
          },
          attributes: ['day'],
        },
      ],
      attributes: ['id', 'name'],
    });

    // Prepare final staff array with their available days
    const staffWithDays = staff.map(staffMember => ({
      id: staffMember.id,
      name: staffMember.name,
      daysAvailable: staffMember.StaffAvailabilities.map(sa => sa.day),
    }));

    res.status(200).json({
      serviceId,
      availableDays: availability.availableDays,
      availableTimeSlots: availability.availableTimeSlots,
      staff: staffWithDays,
    });

  } catch (error) {
    console.error("Error fetching service availability:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const jwt = require('jsonwebtoken');

exports.bookAppointment = async (req, res) => {
  try {
    const { serviceId, day, time, staffId, date } = req.body; // ✅ include date and staffId

    const userId = req.user.id;

    console.log("REQ USER>>>", userId, serviceId, day, time, date, staffId);

    // Optional: Validate that the service exists
    const service = await Service.findByPk(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Optional: Validate the staff is available (if not already validated on frontend)
    const staffAvailable = await StaffAvailability.findOne({
      where: {
        staffId,
        day,
        startTime: { [Op.lte]: time },
        endTime: { [Op.gte]: time }
      }
    });

    if (!staffAvailable) {
      return res.status(400).json({ message: 'Selected staff is not available at this time.' });
    }

    // ✅ Create the appointment with actual date and staffId
    const appointment = await Appointment.create({
      userId,
      staffId,
      serviceId,
      date,
      day,       // actual appointment date: "2025-04-14"
      time,       // e.g. "10:00"
      status: 'booked'
    });

    return res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    console.error('Booking error:', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

//=====


// Check if the slot is already booked
exports.checkIfServiceBooked = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const appointment = await Appointment.findOne({
      where: {
        serviceId,
        status: 'booked'
      }
    });

    if (appointment) {
      return res.status(409).json({ error: "This service is already booked." });
    }

    res.status(200).json({ available: true });
  } catch (error) {
    console.error("Error checking service booking:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// controllers/appointmentController.js
exports.getUpcomingssAppointments = async (req, res) => {
  const userId = req.user.id;
  console.log("INSIDE HERE>>>>")
  try {
    const appointments = await Appointment.findAll({
      where: {
        userId,
        status: 'booked',
        date: { [Op.gte]: new Date().toISOString().split('T')[0] },
      },
      include: [Service, Staff], // include associations
      order: [['date', 'ASC'], ['time', 'ASC']],
    });

    res.json(appointments);
  } catch (error) {
    console.error("Failed to fetch upcoming appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};


