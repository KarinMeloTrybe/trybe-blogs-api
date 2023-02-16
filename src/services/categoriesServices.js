const { Category } = require('../models');

const newCategory = async (name) => { // dava pra ser body ao inves de name?
    if (!name) {
        return { status: 400, message: '"name" is required' };
    }
    const createCategory = await Category.create({ name });
    return createCategory;
};

const getAllCategories = async (name) => {
    const category = await Category.findAll({ name });
    return category;
};

module.exports = {
    newCategory,
    getAllCategories,
};