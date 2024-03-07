const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Route = require('./Route');

const Ascent = sequelize.define('Ascent', {
  Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  TickType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isIn: [['Flash', 'Redpoint', 'Hangdog', 'Attempt']]
    }
  },
  Notes: {
    type: DataTypes.TEXT
  },
})

Route.hasMany(Ascent, { foreignKey: 'RouteId' });
Ascent.belongsTo(Route, { foreignKey: 'RouteId' });

module.exports = Ascent;