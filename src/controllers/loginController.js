require('dotenv/config');
const jwt = require('jsonwebtoken');
const loginServices = require('../services/loginServices');
const secret = process.env.JWT_SECRET || 'mySecret';


/* const bodyValidation = (email, password) => email && password; */
module.exports = async (request, response) => {
  try{const { email, password } = request.body;
  /* if(!bodyValidation(email, password)) {
    return response.status(400).json({ message: "Some required fields are missing" });
  } */
  const result = await loginServices.newLogin(email);
  if(!result || result.password !== password) {
    return response.status(400).json({ message: "Invalid fields" });
  }
  const jwtConfig = { expiresIn: '10d', algorithm: 'HS256'};
  const token = jwt.sign({ data: { userId: result.id } }, secret, jwtConfig)
  return response.status(200).json({ token });
 } catch(err) {
  return res.status(500).json({ message: err.message });
 }
};