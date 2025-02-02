const express = require('express');
const { updateTestController } = require('../controllers/ScheduleTestController');

const ScheduleRoute = express.Router();

//get when nijhe kono information pass korchina
//post when nijhe information pass korchi
ScheduleRoute.post('/update', updateTestController);

module.exports = ScheduleRoute;