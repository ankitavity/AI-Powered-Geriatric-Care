const express = require('express');
const { loginController, registerController, sendEmail, getPatDetails } = require('../controllers/PatientController');

const patientRouter = express.Router();

//get when nijhe kono information pass korchina
//post when nijhe information pass korchi
patientRouter.post('/login', loginController);
patientRouter.post('/register', registerController);
patientRouter.post('/sendEmail',sendEmail)
patientRouter.post('/patdetails',getPatDetails)

module.exports = patientRouter;