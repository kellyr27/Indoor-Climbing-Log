const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'test' ? './db/test-database.sqlite' : './db/database.sqlite',
  logging: false
});

module.exports = sequelize;