const categoriesServices = require('../services/categoriesServices');

const newCategory = async (request, response) => {
    const { name } = request.body;
    const createCategory = await categoriesServices.newCategory(name);
    if (createCategory.message) {
        return response.status(createCategory.status).json({ message: createCategory.message });
    }
    return response.status(201).json(createCategory);
};

const getAllCategories = async (request, response) => {
    const category = await categoriesServices.getAllCategories();
    return response.status(200).json(category);
};

module.exports = {
    newCategory,
    getAllCategories,
};