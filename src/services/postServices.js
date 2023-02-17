/* const jwt = require('jsonwebtoken'); */
const { BlogPost, /* PostCategory,  */Category, User } = require('../models');
/* require('dotenv/config');
 */
/* const { JWT_SECRET } = process.env;

const validationToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
}; */

/* const validationCategoryIds = async (categoryIds) => {
  const allCategories = await Category.findAll();
  return allCategories
    .every((category) => categoryIds.some((id) => category.dataValues.id === id));
};

const newPost = async ({ title, content, categoryIds }, token) => {
  const { data: { dataValues: { id } } } = validationToken(token);
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
}; */

const getAllPost = async () => {
  const post = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  if (!post) return { type: 'error', message: 'Post Not Found' };
  return { type: null, message: post };
};

const getIdPost = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  if (!post) return { type: 'error', message: 'Post does not exist' };
  return { type: null, message: post };
};

const editPost = async ({ title, content }, id) => {
  const updatedAt = new Date().getTime();
  const [affectedRows] = await BlogPost.update({ title, content, updatedAt }, { where: { id } });
  if (affectedRows < 1) return { type: 'error', message: 'Cannot Update' };
  const result = await getIdPost(id);
  return result;
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  getAllPost,
  getIdPost,
  editPost,
  deletePost,
};