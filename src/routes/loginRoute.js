const express = require('express');
const loginController = require('../controllers/loginController');
const { validationLogin } = require('../middlewares/loginMiddlewares');

const loginRoute = express.Router();

loginRoute.post('/', validationLogin, loginController.login);

module.exports = { loginRoute };