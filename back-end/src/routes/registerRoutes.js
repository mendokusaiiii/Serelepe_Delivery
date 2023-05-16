const { Router } = require('express');
const registerController = require('../controllers/registerController');
const { validateRegister } = require('../middlewares/validateInformations');

const routes = Router();

routes.use(validateRegister);
routes.post('/', registerController.userRegister);

module.exports = routes;
