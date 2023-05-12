const { Router } = require('express');
const saleController = require('../controllers/saleController');

const routes = Router();

routes.post('/', saleController.createSale);
routes.get('/', saleController.getAllSales);
routes.put('/orders', saleController.updateSale);
routes.get('/:id', saleController.detailedSale);

module.exports = routes;
