const { Router } = require('express');
const registerController = require('../controllers/registerController');
const { validateRegister } = require('../middlewares/validateInformations');
const { validateAdmin } = require('../middlewares/validateAdmRole');
const { validateToken } = require('../middlewares/validateToken');

const routes = Router();

routes.use(validateToken);
routes.use(validateAdmin);

routes.post('/', validateRegister, registerController.userRegister);
routes.get('/', registerController.getAllUsers);
routes.delete('/:id', registerController.deleteUser);

module.exports = routes;