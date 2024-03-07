const express = require('express');
const router = express.Router();
const { getAllRoutes, createRoute, editRoute, getRoute, getRouteAscents, deleteRoute } = require('../controllers/routes');
const checkToken = require('../middleware/checkToken');

router.route('/routes')
    .get(getAllRoutes)
    .post(checkToken, createRoute);

router.route('/routes/:id')
    .get(getRoute)
    .put(checkToken, editRoute)
    .delete(checkToken, deleteRoute);

router.route('/routes/:id/ascents')
    .get(getRouteAscents)

module.exports = router;