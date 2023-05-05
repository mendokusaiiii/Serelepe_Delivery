const { Router } = require('express');
const productsController = require('../controllers/productsController');

const routes = Router();

routes.get('/', productsController.getAllProducts);

module.exports = routes;
