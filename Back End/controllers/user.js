const User = require('../models/User');

const signup = async (req, res) => {
    const { fullName, email, password, userType } = req.body;
  
    try {
      // Create a new user in the database
      const newUser = await User.create({
        fullName,
        email,
        password,
        userType,
      });
  
      res.status(201).json({
        message: 'User signed up successfully!',
        user: newUser,
      });
    } catch (error) {
      console.error('Error during sign-up:', error);
      res.status(500).json({
        error: 'An error occurred during sign-up.',
      });
    }
};

module.exports = { signup };