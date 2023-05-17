const { Router } = require('express');
const userController = require('../controllers/userController');
const registerController = require('../controllers/registerController');
const { validateRegister } = require('../middlewares/validateInformation');
const { validateAdmin } = require('../middlewares/validateAdminRole');
const { validateToken } = require('../middlewares/validateToken');

const routes = Router();

routes.use(validateToken);
routes.use(validateAdmin);

routes.post('/', validateRegister, registerController.userRegister);
routes.get('/', userController.getAllUsers);
routes.delete('/:id', userController.deleteUser);

module.exports = routes;