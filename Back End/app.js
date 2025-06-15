const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Sequelize and database connection
const sequelize = new Sequelize('SALON','root','Itsgreat_12345', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the User model
const User = sequelize.define('User', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt columns
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced and User model is ready.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// POST route for sign-up
app.post('/signup', async (req, res) => {
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
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
