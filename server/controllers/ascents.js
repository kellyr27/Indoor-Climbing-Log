const Ascent = require('../models/Ascent');
const Route = require('../models/Route');

const getAllAscents = async (req, res) => {
    try {
        const ascents = await Ascent.findAll({
            include: [{
                model: Route,
                attributes: ['Name', 'Grade', 'Colour']
            }],
        });
        return res.status(200).json(ascents);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

const createAscentDate = async (req, res) => {
    // Find the creation date of the last recorded ascent
    const lastCreatedAscent = await Ascent.findOne({
        order: [['createdAt', 'DESC']] // Sort by DateCreated in descending order
    });

    // If the ascent was created within the last 24 hours, return the date of the ascent
    if (lastCreatedAscent && Date.now() - new Date(lastCreatedAscent.createdAt).getTime() < 86400000) {
        res.status(200).json({ date: lastCreatedAscent.Date });
    } else {
        res.status(200).json({ date: Date.now().split('T')[0] });
    }
}

const getAscent = async (req, res) => {
    const { id } = req.params;

    try {
        const ascent = await Ascent.findByPk(id);
        const route = await Route.findByPk(ascent.RouteId);

        // Fetch all ascents for the route
        const ascents = await Ascent.findAll({
            where: { RouteId: ascent.RouteId },
            order: [['createdAt', 'ASC']], // Sort by DateCreated in ascending order
        });

        console.log(ascents)

        // Check if the current ascent is the first one
        const isFirstAscent = ascents[0].id === ascent.id;

        if (ascent && route) {
            if (isFirstAscent) {
                res.status(200).json({ ...ascent.dataValues, RouteName: route.Name, RouteGrade: route.Grade, RouteColour: route.Colour, isFirstAscent: true });
            } else {
                res.status(200).json({ ...ascent.dataValues, RouteName: route.Name, RouteGrade: route.Grade, RouteColour: route.Colour });
            }
        } else {
            res.status(404).json({message: 'Ascent not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

const createAscent = async (req, res) => {


    const { 
        tickType: TickType,
        date: Date,
        notes: Notes,
        routeName,
        routeGrade,
        routeColour
    } = req.body;

    console.log(Date)

    // Check if Date is a valid ISO date
    if (!Date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)) {
        return res.status(400).json({message: 'Invalid date format'});
    }

    // Check if route exists
    console.log(routeName, routeGrade, routeColour)

    const route = await Route.findOne({ where: { Name: routeName } });
    console.log(route)
    if (!route) {
        // Create the route
        try {
            const newRoute = await Route.create({ Name: routeName, Grade: routeGrade, Colour: routeColour });
        } catch (error) {
            console.log('Creating route failed')
            return res.status(400).json({message: 'Invalid data'});
        }
    }

    // Create the ascent
    try {
        // Find the route
        const route = await Route.findOne({ where: { Name: routeName } });
        console.log(TickType, Date, Notes, route.id)
        const newAscent = await Ascent.create({ RouteId: route.id, TickType: TickType, Date: Date, Notes: Notes });
        res.status(201).json(newAscent);
    } catch (error) {
        console.log('Creating ascent failed')
        res.status(400).json({message: 'Invalid data'});
    }

}

// Edit an ascent
const editAscent = async (req, res) => {
    const { id } = req.params;
    const { 
        tickType: TickType,
        date: Date,
        notes: Notes,
        routeName,
        routeGrade,
        routeColour
    } = req.body;

    // Check if Date is a valid ISO date
    if (!Date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)) {
        return res.status(400).json({message: 'Invalid date format'});
    }
    
    try {
        const ascent = await Ascent.findByPk(id);
        
        // Check if route exists
        let route = await Route.findOne({ where: { Name: routeName } });
        if (!route) {
            // Create the route
            route = await Route.create({ Name: routeName, Grade: routeGrade, Colour: routeColour });
        }

        ascent.RouteId = route.id;
        ascent.TickType = TickType;
        ascent.Date = Date;
        ascent.Notes = Notes;
        await ascent.save();
        res.status(200).json(ascent);
    } catch (error) {
        res.status(400).json({message: 'Invalid data'});
    }
}

// Delete an ascent
const deleteAscent = async (req, res) => {
    const { id } = req.params;


    try {
        const ascent = await Ascent.findByPk(id);

        // If there is only 1 route using this ascent, delete the route
        const route = await Route.findByPk(ascent.RouteId);
        const ascents = await Ascent.findAll({ where: { RouteId: route.id } });
        if (ascents.length === 1) {
            await route.destroy();
        }

        await ascent.destroy();

        res.status(204).json({message: 'Ascent deleted'});
    } catch (error) {
        res.status(400).json({message: 'Invalid data'});
    }
}

module.exports = {
    getAllAscents,
    getAscent,
    createAscent,
    editAscent,
    deleteAscent,
    createAscentDate
}