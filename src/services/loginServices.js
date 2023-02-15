/* require('dotenv/config');
const jwt = require('jsonwebtoken'); */
const { User } = require('../models');
/* const { JWT_SECRET } = process.env; */

/* const newLogin = async(email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return response.status(400).json(message);

  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '10d', algorithm: true } );
}; */

const newLogin = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
}

module.exports = {
  newLogin
};