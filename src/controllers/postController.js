const postServices = require('../services/postServices');

const newPost = async (request, response) => {
    const { type, message } = await postServices
        .newPost(request.body, request.headers.authorization);
    if (type) {
        return response.status(400).json({ message });
    }
    return response.status(201).json(message);
};

const getAllPost = async (request, response) => {
const { type, message } = await postServices.getAllPost();
if (type) {
    return response.status(404).json({ message });
}
return response.status(200).json(message);
};

module.exports = {
    newPost,
    getAllPost,
};