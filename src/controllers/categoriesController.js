const categoriesServices = require('../services/categoriesServices');

const newCategory = async (request, response) => {
const { name } = request.body;
const createCategory = await categoriesServices.newCategory(name);
if (createCategory.message) {
    return response.status(createCategory.status).json({ message: createCategory.message });
}
return response.status(201).json(createCategory);
};

module.exports = { newCategory };