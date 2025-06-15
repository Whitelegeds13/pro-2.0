const { Sequelize } = require('sequelize');
const sequelize = require('../db');

const Course = require('./Course');

const models = {
  Course: Course(sequelize)
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
