const express = require('express');
const userController = require('../controllers/userController');
const { validationUser, validationToken } = require('../middlewares/userMiddlewares');

const userRoute = express.Router();

userRoute.post('/', validationUser, userController.newUser);

userRoute.get('/', validationToken, userController.getAllUser);

userRoute.get('/:id', validationToken, userController.getUserId);

module.exports = { userRoute };