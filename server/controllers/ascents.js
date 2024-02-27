const Ascent = require('../models/Ascent');
const Route = require('../models/Route');

const getAllAscents = async (req, res) => {
    try {
        const ascents = await Ascent.findAll();
        res.status(200).json(ascents);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

const getAscent = async (req, res) => {
    const { id } = req.params;

    try {
        const ascent = await Ascent.findByPk(id);
        if (ascent) {
            res.status(200).json(ascent);
        } else {
            res.status(404).json({message: 'Ascent not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

const createAscent = async (req, res) => {

    console.log('Creating an ascent')

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
        console.log('Date failed')
        return res.status(400).json({message: 'Invalid date format'});
    }

    // Check if route exists
    const route = await Route.findOne({ where: { Name: routeName } });
    if (!route) {
        // Create the route
        try {
            const newRoute = await Route.create({ Name: routeName, Grade: routeGrade, Colour: routeColour });
        } catch (error) {
            console.log('Creating route failed')
            res.status(400).json({message: 'Invalid data'});
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
    const { RouteId, TickType, Date, Notes } = req.body;

    // Check if Date is a valid ISO date
    if (!Date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)) {
        return res.status(400).json({message: 'Invalid date format'});
    }
    
    try {
        const ascent = await Ascent.findByPk(id);
        ascent.RouteId = RouteId;
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
    deleteAscent
}