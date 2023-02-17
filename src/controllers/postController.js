const postServices = require('../services/postServices');

/* const newPost = async (request, response) => {
    const { type, message } = await postServices
        .newPost(request.body, request.headers.authorization);
    if (type) {
        return response.status(400).json({ message });
    }
    return response.status(201).json(message);
}; */

const getAllPost = async (_request, response) => {
    const { type, message } = await postServices.getAllPost();
    if (type) {
        return response.status(404).json({ message });
    }
    return response.status(200).json(message);
};

const getIdPost = async (request, response) => {
    const { id } = request.params;
    const { type, message } = await postServices.getIdPost(id);
    if (type) {
        return response.status(404).json({ message });
    }
    return response.status(200).json(message);
};

const editPost = async (request, response) => {
    const { body } = request;
    const { id } = request.params;
    const { user } = request;
    if (Number(id) !== Number(user.id)) {
        return response
            .status(401).json({ message: 'Unauthorized user' });
    }
    const { type, message } = await postServices.editPost(body, id);
    if (type) return response.sttaus(400).json({ message });
    return response.status(200).json(message);
};

const deletePost = async (request, response) => {
    const { id } = request.params;
    const { user } = request;
    console.log(user.id);
    const { type, message } = await postServices.getIdPost(id);
    console.log(message);
    if (type) return response.status(404).json({ message: 'Post does not exist' });
    if (user.id !== message.dataValues.userId) {
        return response.status(401).json({ message: 'Unauthorized user' });
    }
    await postServices.deletePost(id);
    return response.status(204).json();
};

const getPostByQuery = async (request, response) => {
    const { q } = request.query;
    const result = await postServices.getPostByQuery(q);
    return response.status(200).json(result);
  };

    module.exports = {
        /*  newPost, */
        getAllPost,
        getIdPost,
        editPost,
        deletePost,
        getPostByQuery,
    };