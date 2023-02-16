const express = require('express');

const app = express();

app.use(express.json());

const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

/* const { userSchema } = require('./schema');

const validationUser = async (request, response, next) => {
  const newUser = request.body;
  const { error } = userSchema.validate(newUser);
  if (error) {
      return response.status(400).json({ message: error.message }); 
  }
  next();
}; */

const validationUser = (request, response, next) => {
  const { displayName, email, password } = request.body;
  if (displayName.length < 8) {
    return response.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  if (!email.match(regex)) {
    return response.status(400).json({
      message: '"email" must be a valid email',
    });
  }
  if (password.length < 6) {
    return response.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
}
return next();
};

module.exports = { validationUser };
