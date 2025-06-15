const ServiceAvailability = require('../models/ServiceAvailability');
const Service = require('../models/Service');

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
