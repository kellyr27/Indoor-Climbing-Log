const Ascent = require('../models/Ascent');
const Route = require('../models/Route');

const getStatsAscents = async () => {
    // Get a list of all Ascents and Routes
    const ascents = await Ascent.findAll({});
    const routes = await Route.findAll({});
    
    // Group the ascents togather by RouteId
    const ascentsByRouteId = ascents.reduce((acc, ascent) => {
        const { RouteId, TickType } = ascent;
        if (!acc[RouteId]) {
            acc[RouteId] = [];
        }
        acc[RouteId].push(ascent);
        return acc;
    }, {});

    
    // Sort the ascents by date
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
                Sends: count 
            };
        });

        // For each RouteId, calculate the points for each ascent
        ascentsByRouteId[RouteId] = ascentsByRouteId[RouteId].map(ascent => {
            return {
                ...ascent,
                Points: calcPoints(ascent, routes)
            }
        });
        


    });

    // Finally, combine the ascentsByRouteId object into one list
    const combinedList = Object.values(ascentsByRouteId).flat();

    return combinedList
}

const calcPoints = (ascent, routes) => {


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

    const getPointsScarcity = (numSends) => {
        if (numSends <= 1) {
            return 'Low'
        } else if ((numSends > 1) && (numSends <= 5)) {
            return 'Medium'
        } else {
            return 'High'
        }
    }

    // Find the route from the ascent RouteId
    const route = routes.find(route => route.id === ascent.RouteId);

    const pointsTickType = POINTS_TICKTYPE[ascent.TickType];
    const pointsScarcity = POINTS_SCARCITY[getPointsScarcity(ascent.Sends)];

    console.log(typeof(route.Grade), pointsTickType, pointsScarcity)

    return route.Grade + pointsTickType + pointsScarcity;

}

const getSessionStats = async (req, res) => {

    const ascentsRatings = await getStatsAscents();

    // Get a list of all unique dates from the list of ascents
    const uniqueDates = [...new Set(ascentsRatings.map(ascent => {
        const date = new Date(ascent.Date);
        return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
    }).filter(date => date !== null))];
    const sortedUniqueDates = uniqueDates.sort((a, b) => new Date(a) - new Date(b));

    // For each date, get a average rating for the day
    const sessionStats = sortedUniqueDates.map(date => {
        const ascentsForDate = ascentsRatings.filter(ascent => {
            const dateObj = new Date(ascent.Date);
            return !isNaN(dateObj.getTime()) && dateObj.toISOString().split('T')[0] === date;
        });

        if (ascentsForDate.length === 0) {
            return { date, averageRating: 0 };
        }

        const averageRating = ascentsForDate.reduce((acc, ascent) => {
            return acc + ascent.Points;
        }, 0) / ascentsForDate.length;

        // Round averageRatings to 2 decimal places
        return { date, averageRating: Math.round(averageRating * 100) / 100 };
    });

    console.log(sessionStats)

    return res.status(200).json(sessionStats);
}

const getMonthlyStats = async (req, res) => {



    return res.status(200)
}

module.exports = {
    getSessionStats,
    getMonthlyStats
};