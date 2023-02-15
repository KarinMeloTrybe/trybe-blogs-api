const express = require('express');
const { loginRoute } = require('./routes/loginRoute');
const loginController = require('./controllers/loginController');

const app = express();

app.use(express.json());

/* app.use('/login', loginRoute) */;

app.post('/login', loginController);

module.exports = app;
