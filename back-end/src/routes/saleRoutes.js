const { Router } = require('express');
const saleController = require('../controllers/saleController');
const validateToken = require('../middlewares/validateToken');

const routes = Router();

routes.post('/', validateToken, saleController.createSale);
routes.get('/', saleController.getAllSales);

module.exports = routes;
