const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Ascent = require('./Ascent');


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
    },
    isSent: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.Ascents) {
                return this.Ascents.some((ascent) => {
                    return ascent.TickType === 'Flash' || ascent.TickType === 'Redpoint'
                });
            }
            return false;
        },
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['Name', 'Grade', 'Colour']
        }
    ]
});

module.exports = Route;