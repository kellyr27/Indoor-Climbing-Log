const Route = require('../models/Route');

const routeExists = async (routeName) => {
    const route = await Route.findOne({ where: { Name: routeName } });
    return route ? true : false;
}

module.exports = routeExists;