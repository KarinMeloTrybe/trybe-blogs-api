const loginServices = require('../services/loginServices');


const newLogin = {
  login: async (request, response) => {
    const { email } = request.body;
  const token = await loginServices.newLogin(email);
  if (!token) {
    return response.status(400).json({ message: "Invalid fields" });
  }
  return response.status(200).json({ token });
}
}
module.exports = newLogin;
