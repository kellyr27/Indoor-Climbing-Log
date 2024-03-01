const express = require('express');
const router = express.Router();
const {getSessionStats, getMonthlyStats} = require('../controllers/stats');

router.get('/stats/sessions', getSessionStats);
router.get('/stats/monthly', getMonthlyStats);

module.exports = router;