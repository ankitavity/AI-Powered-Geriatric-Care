const express = require('express');
const { loginController, registerController,getPatDetails } = require('../controllers/DoctorController');

const DoctorRouter = express.Router();

DoctorRouter.post('/login', loginController);
DoctorRouter.post('/register', registerController);
DoctorRouter.post('/get_pat_details',getPatDetails)

module.exports = DoctorRouter;