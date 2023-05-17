const { Router } = require('express');
const registerController = require('../controllers/registerController');

const routes = Router();

routes.post('/', registerController.userRegister);

module.exports = routes;
