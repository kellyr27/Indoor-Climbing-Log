const express = require('express');
const router = express.Router();
const { getAllAscents, getAscent, createAscent, editAscent, deleteAscent, createAscentDate } = require('../controllers/ascents');

router.route('/ascents')
    .get(getAllAscents)
    .post(createAscent);

router.route('/ascents/create-date')
    .get(createAscentDate);

router.route('/ascents/:id')
    .get(getAscent)
    .put(editAscent)
    .delete(deleteAscent);

module.exports = router;