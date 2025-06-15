const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // Replace with the path to your database configuration

const StaffAvailability = sequelize.define('StaffAvailability', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    staffId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { model: 'Staff', key: 'id' } 
    },
    day: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
  }, {
    timestamps: false
  });
  
  module.exports = StaffAvailability;
  