const express = require('express');
const router = express.Router();
const { getAllRoutes, createRoute, editRoute, getRoute, getRouteAscents, deleteRoute } = require('../controllers/routes');

// Routes
router.get('/routes', getAllRoutes);
router.post('/routes', createRoute);
router.put('/routes/:id', editRoute);
router.get('/routes/:id', getRoute);
router.delete('/routes/:id', deleteRoute);
router.get('/routes/:id/ascents', getRouteAscents);

module.exports = router;