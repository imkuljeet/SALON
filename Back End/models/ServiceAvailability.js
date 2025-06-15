const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // Replace with the path to your database configuration

const ServiceAvailability = sequelize.define('ServiceAvailability', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    serviceId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { model: 'Services', key: 'id' } 
    },
    availableDays: { type: DataTypes.JSON, allowNull: false }, // Example: ["Monday", "Wednesday"]
    availableTimeSlots: { type: DataTypes.JSON, allowNull: false }, // Example: ["10:00", "14:00"]
  }, {
    timestamps: false
  });
  
  module.exports = ServiceAvailability;
  