const ServiceAvailability = require('../models/ServiceAvailability');
const Service = require('../models/Service');

// const { Appointment, User, Service, Staff, StaffAvailability } = require('../models');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Staff = require('../models/Staff');
const StaffAvailability = require('../models/StaffAvailability');
const { Op } = require('sequelize');

exports.getServiceAvailabilityByServiceId = async (req, res) => {
  const { serviceId } = req.params;

  try {
    // Check if service exists
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found." });
    }

    // Fetch availability for the given serviceId
    const availability = await ServiceAvailability.findOne({ where: { serviceId } });

    if (!availability) {
      return res.status(404).json({ error: "No availability data found for this service." });
    }

    res.status(200).json({
      serviceId,
      availableDays: availability.availableDays,
      availableTimeSlots: availability.availableTimeSlots,
    });

  } catch (error) {
    console.error("Error fetching service availability:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const jwt = require('jsonwebtoken');

exports.bookAppointment = async (req, res) => {
  try {
    const { serviceId, day, time } = req.body;
    
    const userId = req.user.id;

    console.log("REQ USER>>>",userId,serviceId,day,time);

    // Optional: Validate that the service exists
    const service = await Service.findByPk(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Find staff available for the service at the given day and time
    const staff = await Staff.findOne({
      include: [
        {
          model: StaffAvailability,
          where: {
            day,
            startTime: { [Op.lte]: time },
            endTime: { [Op.gte]: time }
          }
        },
        {
          model: Service,
          where: { id: serviceId }
        }
      ]
    });

    if (!staff) {
      return res.status(400).json({ message: 'No available staff for selected time.' });
    }

    // Create the appointment
    const appointment = await Appointment.create({
      userId,
      staffId: staff.id,
      serviceId,
      date: day,
      time,
      status: 'booked'
    });

    return res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    console.error('Booking error:', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
