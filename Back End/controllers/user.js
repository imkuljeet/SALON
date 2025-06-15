const bcrypt = require('bcrypt'); // Import bcrypt for hashing
const User = require('../models/User'); // Import the User model

const signup = async (req, res) => {
    const { fullName, email, password, userType } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists!' }); // Send response to frontend
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user in the database with the hashed password
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword, // Save the hashed password
            userType,
        });

        res.status(201).json({
            message: 'Sign up successfull!',
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                userType: newUser.userType,
            }, // Do not return the hashed password
        });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({
            error: 'An error occurred during sign-up.',
        });
    }
};

module.exports = { signup };
