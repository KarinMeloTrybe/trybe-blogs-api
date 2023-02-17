const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, Category } = require('../models');
require('dotenv/config');

const { JWT_SECRET } = process.env;

const validationToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
};

const validationCategoryIds = async (categoryIds) => {
    const allCategories = await Category.findAll();
    return allCategories
    .every((category) => categoryIds.some((id) => category.dataValues.id === id));
};

const newPost = async ({ title, content, categoryIds }, token) => {
   const { data: { id } } = validationToken(token);
  const result = await validationCategoryIds(categoryIds);
    if (!result) return { type: 'error', message: 'one or more "categoryIds" not found' };
    const createCategory = await BlogPost.create({ userId: id, title, content });
    await Promise.all(categoryIds.map(async (category) => {
        await PostCategory.create({ 
            categoryId: category, 
            postId: createCategory.dataValues.id, 
        });
    }));
    return { type: null, message: createCategory };
};

module.exports = { newPost };