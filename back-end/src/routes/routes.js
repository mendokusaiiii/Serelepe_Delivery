const { Router } = require('express');
const loginRoute = require('./loginRoutes');
const registerRoute = require('./registerRoutes');
const productsRoute = require('./productsRoutes');
const saleRoute = require('./saleRoutes');
const sellersRoute = require('./sellersRoute');
const adminRoute = require('./adminRoutes');

const routes = Router();

routes.use('/login', loginRoute);
routes.use('/users', registerRoute);
routes.use('/products', productsRoute);
routes.use('/sale', saleRoute);
routes.use('/sellers', sellersRoute);
routes.use('/admin', adminRoute);

module.exports = routes;
