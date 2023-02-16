const express = require('express');
require('dotenv/config');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validationToken = async (request, response, next) => {
  const token = request.header('Authorization');
  if (!token) return response.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded.data;
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
};

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

module.exports = {
  validationUser,
  validationToken,
};
