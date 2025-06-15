const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // Replace with the path to your database configuration

const StaffService = sequelize.define('StaffService', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    staffId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { model: 'Staff', key: 'id' } 
    },
    serviceId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { model: 'Service', key: 'id' } 
    },
  }, {
    timestamps: false
  });
  
  module.exports = StaffService;
  