const { Router } = require('express');
const sallersController = require('../controllers/registerController');

const routes = Router();

routes.get('/', sallersController.getSellers);

module.exports = routes;
