const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'db',
  dialect: 'postgres',
  logging: false,
});

async function connectWithRetry() {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    setTimeout(connectWithRetry, 5000); // reintenta en 5 segundos
  }
}

connectWithRetry();

module.exports = sequelize;
