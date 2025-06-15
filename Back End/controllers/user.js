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

const login = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    try {
        // Check if the email exists in the database
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found! Please sign up first.' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials. Please try again.' });
        }

        // Respond with success message if credentials are valid
        res.status(200).json({
            message: 'Login successful!',
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                userType: user.userType,
            }, // Do not include sensitive data (like password) in the response
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login. Please try again later.' });
    }
};


module.exports = { signup, login };
