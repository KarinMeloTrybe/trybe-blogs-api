const validationPost = (request, response, next) => {
  const { title, content, categoryIds } = request.body;
  if (!title || !content || !categoryIds) {
    return response.status(400).json({ message: 'Some required fields are missing' });
  }
    return next();
};

 module.exports = { 
    validationPost,
};