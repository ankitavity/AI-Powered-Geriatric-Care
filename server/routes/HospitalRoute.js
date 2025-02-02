const express = require('express');
const { loginController, registerController, getPatDetails} = require('../controllers/HospitalController');

const HospitalRouter = express.Router();

HospitalRouter.post('/login', loginController);
HospitalRouter.post('/register', registerController);
HospitalRouter.post('/get_pat_details',getPatDetails)


module.exports = HospitalRouter;