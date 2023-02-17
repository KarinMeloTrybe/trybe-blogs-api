const express = require('express');
const postController = require('../controllers/postController');
const { validationToken } = require('../middlewares/userMiddlewares');
const { validationPost } = require('../middlewares/postMiddlewares');

const postRoute = express.Router();

postRoute.post('/', validationPost, validationToken, postController.newPost);

postRoute.get('/', validationToken, postController.getAllPost);

postRoute.get('/:id', validationToken, postController.getIdPost);

module.exports = { postRoute };