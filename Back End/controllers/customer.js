const User = require('../models/User'); // Import the User model

const getCustomers = async (req, res) => {
  try {
    // Fetch all users where userType is 'customer'
    const customers = await User.findAll({ where: { userType: 'customer' } });

    res.status(200).json({
      message: 'Customers fetched successfully!',
      customers,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'An error occurred while fetching customers.' });
  }
};

module.exports = { getCustomers };
