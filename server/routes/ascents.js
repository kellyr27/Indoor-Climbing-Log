const express = require('express');
const router = express.Router();
const { getAllAscents, getAscent, createAscent, editAscent, deleteAscent, createAscentDate } = require('../controllers/ascents');

// Routes
router.get('/ascents', getAllAscents);
router.post('/ascents', createAscent);
router.get('/ascents/create-date', createAscentDate);
router.put('/ascents/:id', editAscent);
router.get('/ascents/:id', getAscent);
router.delete('/ascents/:id', deleteAscent);

module.exports = router;