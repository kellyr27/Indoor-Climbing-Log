const express = require('express');
const router = express.Router();
const { getAllAscents, getAscent, createAscent, editAscent, deleteAscent, createAscentDate } = require('../controllers/ascents');
const checkToken = require('../middleware/checkToken');

router.route('/ascents')
    .get(getAllAscents)
    .post(checkToken, createAscent);

router.route('/ascents/create-date')
    .get(createAscentDate);

router.route('/ascents/:id')
    .get(getAscent)
    .put(checkToken, editAscent)
    .delete(checkToken, deleteAscent);

module.exports = router;