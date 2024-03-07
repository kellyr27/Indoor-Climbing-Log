const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Route = sequelize.define('Route', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 10,
            max: 40
        }
    },
    Colour: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['Name']
        }
    ]
});


module.exports = Route;