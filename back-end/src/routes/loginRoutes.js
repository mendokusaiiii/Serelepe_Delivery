const { Router } = require('express');
const loginController = require('../controllers/loginController');

const routes = Router();

routes.post('/', loginController.login);

module.exports = routes;