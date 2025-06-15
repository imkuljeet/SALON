const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

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
    phoneNumber: { type: DataTypes.STRING, allowNull: true }, // New field
    preferences: { type: DataTypes.STRING, allowNull: true }, // Store preferences in JSON format
  }, {
    timestamps: true, // Adds createdAt and updatedAt columns
  });

  module.exports = User;