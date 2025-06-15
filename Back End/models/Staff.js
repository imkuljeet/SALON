const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // Adjust the path to your database configuration

// Define the Staff model
const Staff = sequelize.define('Staff', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt columns
});

module.exports = Staff;
