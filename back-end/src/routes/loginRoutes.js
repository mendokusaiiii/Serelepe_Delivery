const { Router } = require('express');
const loginController = require('../controllers/loginController');
const { validateLogin } = require('../middlewares/validateInformations');

const routes = Router();

routes.use(validateLogin);
routes.post('/', loginController.login);

module.exports = routes;