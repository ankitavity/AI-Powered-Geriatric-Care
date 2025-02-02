const express = require('express');
const { pushController } = require('../controllers/LogController');

const LogRouter = express.Router();

//get when nijhe kono information pass korchina
//post when nijhe information pass korchi
LogRouter.post('/push', pushController);

module.exports = LogRouter;