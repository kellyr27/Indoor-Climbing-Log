const Ascent = require('../models/Ascent');
const Route = require('../models/Route');
const isDateValidISO = require('../utils/isDateValidISO');
const isValidTickType = require('../utils/isValidTickType');
const routeExists = require('../utils/routeExists');


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
        return res.status(500).json({message: 'Server error', error: error.message});
    }
}

/**
 * When creating a new ascent, this will prefill the date field with the date of the last ascent 
 * recorded if recorded within the last 24 hours or the current date if not.
 */
const createAscentDate = async (req, res) => {
    
    // Find the creation date of the last recorded ascent
    const lastCreatedAscent = await Ascent.findOne({
        order: [['createdAt', 'DESC']]
    });

    // If the ascent was created within the last 24 hours, return the date of the ascent
    const millisecondsInDay = 86400000;
    if (lastCreatedAscent && (Date.now() - new Date(lastCreatedAscent.createdAt).getTime() < millisecondsInDay)) {
        return res.status(200).json({ date: lastCreatedAscent.Date });
    } else {
        return res.status(200).json({ date: new Date().toISOString() });
    }
}

const getAscent = async (req, res) => {
    const { id } = req.params;

    try {
        const ascent = await Ascent.findByPk(id, {
            include: [{
                model: Route,
                attributes: ['Name', 'Grade', 'Colour']
            }],
        });

        if (ascent) {
            return res.status(200).json(ascent);
        } else {
            return res.status(404).json({message: 'Ascent not found'});
        }
    } catch (error) {
        return res.status(500).json({message: 'Server error'});
    }
}

const createAscent = async (req, res) => {
    
    const { 
        tickType: TickType,
        date: InputDate,
        notes: Notes,
        routeName,
        routeGrade,
        routeColour
    } = req.body;

    // Check if Date is a valid ISO date
    if (!isDateValidISO(InputDate)) {
        console.log('Invalid date format')
        return res.status(400).json({message: 'Invalid date format'});
    }
    // Check if TickType is valid
    if (!isValidTickType(TickType)) {
        console.log('Invalid tick type', TickType)
        return res.status(400).json({message: 'Invalid tick type'});
    }


    try {

        const route = await Route.findOne({ where: { Name: routeName } });

        if (!route) {

            const newRoute = await Route.create({ 
                Name: routeName, 
                Grade: routeGrade, 
                Colour: routeColour 
            });
            const newAscent = await Ascent.create({ 
                RouteId: newRoute.id, 
                TickType: TickType, 
                Date: InputDate, 
                Notes: Notes,  
            });
            return res.status(201).json(newAscent);
        } else {
            const newAscent = await Ascent.create({ 
                RouteId: route.id, 
                TickType: TickType, 
                Date: InputDate, 
                Notes: Notes 
            });
            return res.status(201).json(newAscent);
        }
    } catch (error) {
        return res.status(400).json({message: 'Invalid data'});
    }
}

// Edit an ascent
const editAscent = async (req, res) => {
    const { id } = req.params;
    const { 
        tickType: TickType,
        date: InputDate,
        notes: Notes,
        routeName,
        routeGrade,
        routeColour
    } = req.body;

    // Check if Date is a valid ISO date
    if (!isDateValidISO(InputDate)) {
        console.log('Invalid date format')
        return res.status(400).json({message: 'Invalid date format'});
    }
    // Check if TickType is valid
    if (!isValidTickType(TickType)) {
        console.log('Invalid tick type')
        return res.status(400).json({message: 'Invalid tick type'});
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
        ascent.Date = InputDate;
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

        // If there is only one ascent for the route, delete the route as well
        const route = await Route.findByPk(ascent.RouteId)
        const ascents = await Ascent.findAll({ where: { RouteId: route.id } })
        if (ascents.length === 1) {
            await route.destroy();
        }

        await ascent.destroy();

        return res.status(204).json({message: 'Ascent deleted'});
    } catch (error) {
        return res.status(400).json({message: 'Invalid data'});
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