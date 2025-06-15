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

const getCustomerProfile = async (req, res) => {
    try {
        // Fetch the logged-in user's details
        const customer = await User.findOne({ where: { id: req.user.id, userType: 'customer' } });

        if (!customer) return res.status(404).json({ error: "Customer not found!" });

        res.status(200).json({
            name: customer.fullName,
            email: customer.email,
            phoneNumber : customer.phoneNumber,
            preferences : customer.preferences
        });
    } catch (error) {
        console.error('Error fetching customer profile:', error);
        res.status(500).json({ error: 'Server error!' });
    }
};

const updateCustomerProfile = async (req, res) => {
    const { fullName, phoneNumber, preferences } = req.body;

    try {
        // Update customer details
        await User.update(
            { fullName, phoneNumber, preferences },
            { where: { id: req.user.id, userType: 'customer' } }
        );

        res.status(200).json({ message: "Profile updated successfully!" });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'An error occurred while updating the profile.' });
    }
};



module.exports = { getCustomers, getCustomerProfile, updateCustomerProfile };
