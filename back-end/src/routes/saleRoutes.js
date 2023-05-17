const { Router } = require('express');
const saleController = require('../controllers/saleController');

const routes = Router();

routes.post('/byroleid', saleController.salesByRoleId);
routes.get('/:id', saleController.detailedSale);
routes.post('/', saleController.createSale);
routes.put('/:id', saleController.updateSale);

module.exports = routes;
