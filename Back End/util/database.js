const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('SALON','root','Itsgreat_12345', {
    host: 'localhost',
    dialect: 'mysql',
  });

  
module.exports = sequelize;