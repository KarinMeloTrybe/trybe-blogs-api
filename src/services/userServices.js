require('dotenv/config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const { User } = require('../models');

const getEmail = async (email) => {
    const userEmail = await User.findOne({ where: { email } });
    if (!userEmail) return true;
    return false;
};

const create = async (body) => {
    const notExist = await getEmail(body.email);
    if (notExist) {
        const user = await User.create(body);
        if (!user) {
            return { status: 400, message: 'erro geral' };
        }
        const { dataValues } = user;
        const { password: _, ...dataUser } = dataValues; // o underline significa que ignoramos password
        const token = jwt.sign({ data: dataUser }, JWT_SECRET, { expiresIn: '10d' });
        return { status: 201, message: { token } };
    }
    return { status: 409, message: { message: 'User already registered' } };
};

module.exports = {
    create,
    getEmail,
};