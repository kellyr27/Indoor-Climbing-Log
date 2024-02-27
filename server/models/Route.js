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
    },
    hangdogCount: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.Ascents ? this.Ascents.filter(ascent => ascent.TickType === 'Hangdog').length : 0;
        },
    },
    attemptCount: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.Ascents ? this.Ascents.filter(ascent => ascent.TickType === 'Attempt').length : 0;
        },
    },
    flashCount: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.Ascents ? this.Ascents.filter(ascent => ascent.TickType === 'Flash').length : 0;
        },
    },
    redpointCount: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.Ascents ? this.Ascents.filter(ascent => ascent.TickType === 'Redpoint').length : 0;
        },
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['Name']
        }
    ]
});

Route.hasMany(Ascent, { as: 'Ascents' });


module.exports = Route;