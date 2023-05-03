const { Router } = require('express');
const loginRoute = require('./loginRoutes');
const registerRoute = require('./registerRoutes');

const routes = Router();

routes.use('/login', loginRoute);
routes.use('/register', registerRoute);

module.exports = routes;