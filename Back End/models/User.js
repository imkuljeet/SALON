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
  }, {
    timestamps: true, // Adds createdAt and updatedAt columns
  });

  module.exports = User;