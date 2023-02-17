const validationUpdate = (request, response, next) => {
    const { title, content } = request.body;
    if (!title || !content) {
      return response.status(400).json({ message: 'Some required fields are missing' });
    }
      return next();
  };

  module.exports = validationUpdate;