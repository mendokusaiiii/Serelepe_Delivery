const { Router } = require('express');
const loginRoute = require('./loginRoutes');

const routes = Router();

routes.use('/login', loginRoute);

module.exports = routes;