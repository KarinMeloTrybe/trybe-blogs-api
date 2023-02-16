const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const { validationToken } = require('../middlewares/userMiddlewares');

const categoriesRoute = express.Router();

categoriesRoute.post('/', validationToken, categoriesController.newCategory);

module.exports = { categoriesRoute };