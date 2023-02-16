const userServices = require('../services/userServices');

const newUser = async (request, response) => { 
const { status, message } = await userServices.create(request.body);
return response.status(status).json(message);
};

module.exports = { newUser };