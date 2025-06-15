const StaffAvailability = require('../models/StaffAvailability');
const Staff = require('../models/Staff');
const Service = require('../models/Service');

exports.assignServiceToStaff = async (req, res) => {
    const { staffId, serviceId } = req.body;

    try {
        // Fetch staff and service details
        const staff = await Staff.findByPk(staffId);
        const service = await Service.findByPk(serviceId);

        if (!staff || !service) {
            return res.status(404).json({ error: "Staff or service not found!" });
        }

        // Verify staff specialization matches service
        if (!staff.specialization.includes(service.name)) {
            return res.status(400).json({ error: `Staff member does not specialize in ${service.name}` });
        }

        // Check staff availability
        const availability = await StaffAvailability.findOne({ where: { staffId } });

        if (!availability) {
            return res.status(400).json({ error: "Staff member has no availability set!" });
        }

        // Assign service to staff
        await StaffService.create({ staffId, serviceId });
        res.status(201).json({ message: "Service assigned successfully!", staff, service });

    } catch (error) {
        console.error("Error assigning service:", error);
        res.status(500).json({ error: "An error occurred while assigning service." });
    }
};
