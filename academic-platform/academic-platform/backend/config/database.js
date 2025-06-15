const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'db',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
