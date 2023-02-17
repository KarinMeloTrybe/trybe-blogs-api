require('dotenv/config');
const jwt = require('jsonwebtoken'); 
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const newLogin = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;
  return jwt.sign({ data: user }, JWT_SECRET, { expiresIn: '10d' });
};

module.exports = {
  newLogin,
};