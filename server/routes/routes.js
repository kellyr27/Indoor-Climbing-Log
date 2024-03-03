const express = require('express');
const router = express.Router();
const { getAllRoutes, createRoute, editRoute, getRoute, getRouteAscents, deleteRoute } = require('../controllers/routes');

router.route('/routes')
    .get(getAllRoutes)
    .post(createRoute);

router.route('/routes/:id')
    .get(getRoute)
    .put(editRoute)
    .delete(deleteRoute);

router.route('/routes/:id/ascents')
    .get(getRouteAscents)

module.exports = router;