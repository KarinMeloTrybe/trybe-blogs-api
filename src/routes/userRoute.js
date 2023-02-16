const express = require('express');
const userController = require('../controllers/userController');
const { validationUser } = require('../middlewares/userMiddlewares'); 

const userRoute = express.Router();

userRoute.post('/', validationUser, userController.newUser);

module.exports = { userRoute };