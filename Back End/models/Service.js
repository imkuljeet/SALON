const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // Replace with the path to your database configuration

// Define the Service model
const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Service name is required
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false, // Service price is required
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false, // Duration (in minutes) is required
  },
}, {
  timestamps: true, // Includes createdAt and updatedAt fields
});

module.exports = Service;
