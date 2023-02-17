const userServices = require('../services/userServices');

const newUser = async (request, response) => { 
const { status, message } = await userServices.create(request.body);
return response.status(status).json(message);
};

const getAllUser = async (_request, response) => {
    const users = await userServices.getAllUser();
    return response.status(200).json(users);
};

const getUserId = async (request, response) => {
    const { id } = request.params;
    const user = await userServices.getUserId(id);
    if (!user) return response.status(404).json({ message: 'User does not exist' });
return response.status(200).json(user);
};

const deletedMe = async (request, response) => {
    await userServices.deletedMe(request.user.id);
    return response.status(204).json();
  };

module.exports = { 
    newUser,
    getAllUser,
    getUserId,
    deletedMe,
};

/* request.user.id; */