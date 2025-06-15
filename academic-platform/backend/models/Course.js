const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  return Course;
};
