const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());


const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
"any.required": "Some required fields are missing"}),
    password: Joi.string().required().messages({
    "any.required": "Some required fields are missing"}),
    })

const validationLogin = async (request, response, next) => {
        const userLogin = request.body;
        const { error } = loginSchema.validate(userLogin);
        if (error) {
          return response.status(400).json(message);
        }
         next();
        };

module.exports = {
validationLogin,
};