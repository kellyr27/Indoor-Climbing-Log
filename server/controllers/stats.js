const Ascent = require('../models/Ascent');
const Route = require('../models/Route');

const getStatsAscents = () => {
    // Get a list of all Ascents
    const ascents = await Ascent.findAll({});
    
    // Group the ascents togather by RouteId
    const ascentsByRouteId = ascents.reduce((acc, ascent) => {
        const { RouteId, TickType } = ascent;
        if (!acc[RouteId]) {
            acc[RouteId] = [];
        }
        acc[RouteId].push(ascent);
        return acc;
    }, {});
    
    Object.keys(ascentsByRouteId).forEach(RouteId => {
        ascentsByRouteId[RouteId].sort((a, b) => {
            const dateComparison = new Date(a.Date) - new Date(b.Date);
            if (dateComparison !== 0) {
                return dateComparison;
            } else {
                return a.id - b.id;
            }
        });
        let count = 0;
        ascentsByRouteId[RouteId] = ascentsByRouteId[RouteId].map(ascent => {
            if (ascent.TickType === 'Redpoint' || ascent.TickType === 'Flash') {
                count++;
            }
            return { 
                id: ascent.id, 
                Date: ascent.Date, 
                TickType: ascent.TickType, 
                RouteId: ascent.RouteId, 
                redpointsAndFlashCount: count 
            };
        });
    });

    return ascentsByRouteId
}

const calcPoints = () => {
    const POINTS_TICKTYPE = {
        'Flash': 5, 
        'Redpoint': 4,
        'Hangdog': 3,
        'Attempt': 1
    }

    const POINTS_SCARCITY = {
        'Low': 2,
        'Medium': 1,
        'High': 0
    }
}

const getSessionStats = async (req, res) => {



    return res.status(200)
}

const getMonthlyStats = async (req, res) => {
    return res.status(200)
}

module.exports = {
    getSessionStats,
    getMonthlyStats
};