const express = require('express');

const app = express();

app.use(express.json());

const loginSchema = require('./schema');

const validationLogin = async (request, response, next) => {
  const userLogin = request.body;
  const { error } = loginSchema.validate(userLogin);
  if (error) {
    return response
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  next();
};
module.exports = { validationLogin };