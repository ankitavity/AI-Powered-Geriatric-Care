const express = require('express');
const { addPrescribeController,deletePrescribeController } = require('../controllers/PrescriptionController');

const PrescripRouter = express.Router();

//get when nijhe kono information pass korchina
//post when nijhe information pass korchi
PrescripRouter.post('/add', addPrescribeController);
PrescripRouter.post('/delete', deletePrescribeController);

module.exports = PrescripRouter;