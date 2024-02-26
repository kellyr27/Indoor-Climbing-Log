const Route = require('../models/route');
const Ascent = require('../models/ascent');

const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.findAll();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

const getRoute = async (req, res) => {

    const { id } = req.params;
    console.log('req.params', req.params)

    try {
        const route = await Route.findByPk(id);
        if (route) {
            res.status(200).json(route);
        } else {
            res.status(404).json({message: 'Route not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

// Get all the Ascents that have been made on a route
const getRouteAscents = async (req, res) => {
    const { id } = req.params;

    try {
        const route = await Route.findByPk(id);
        if (route) {
            const ascents = await Ascent.findAll({ where: { RouteId: id } });
            res.status(200).json(ascents);
        } else {
            res.status(404).json({message: 'Route not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }

}

const createRoute = async (req, res) => {
    const { Name, Grade, Colour } = req.body;

    try {
        const newRoute = await Route.create({ Name, Grade, Colour });
        res.status(201).json(newRoute);
    } catch (error) {
        // console.log(error)
        res.status(400).json({message: 'Invalid data'});
    }
}

// Edit a route
const editRoute = async (req, res) => {
    const { id } = req.params;
    const { Name, Grade, Colour } = req.body;

    try {
        const route = await Route.findByPk(id);
        route.Name = Name;
        route.Grade = Grade;
        route.Colour = Colour;
        await route.save();
        res.status(200).json(route);
    } catch (error) {
        res.status(400).json({message: 'Invalid data'});
    }
}

// Delete a route
const deleteRoute = async (req, res) => {
    const { id } = req.params;

    try {
        const route = await Route.findByPk(id);
        await route.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = {
    getAllRoutes,
    createRoute,
    editRoute,
    getRoute,
    deleteRoute,
    getRouteAscents
};