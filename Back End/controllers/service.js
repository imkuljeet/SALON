const Service = require('../models/Service'); // Import the Service model

const addService = async (req, res) => {
  const { name, price, duration, description } = req.body; // Extract service details

  try {
    // Check if the service already exists
    const existingService = await Service.findOne({ where: { name } });
    if (existingService) {
      return res.status(400).json({ error: 'Service with this name already exists!' });
    }

    // Create a new service with description
    const newService = await Service.create({
      name,
      price,
      duration,
      description, // Added description field
    });

    res.status(201).json({
      message: 'Service added successfully!',
      service: {
        id: newService.id,
        name: newService.name,
        price: newService.price,
        duration: newService.duration,
        description: newService.description, // Include description in response
      },
    });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ error: 'An error occurred while adding the service.' });
  }
};

const getAllServices = async (req, res) => {
  try {
    // Fetch all services from the database
    const services = await Service.findAll();

    res.status(200).json({
      message: 'Services fetched successfully!',
      services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'An error occurred while fetching the services.' });
  }
};


module.exports = { addService, getAllServices };
