const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Appointment = sequelize.define('Appointment', {
  date: {
    type: DataTypes.DATEONLY,  // Changed to DATEONLY for the actual date (YYYY-MM-DD)
    allowNull: false,
  },
  day: {                       // Added 'day' to store the day of the week (e.g., "Monday")
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'booked',
  },
}, {
  timestamps: true,
});

module.exports = Appointment;
