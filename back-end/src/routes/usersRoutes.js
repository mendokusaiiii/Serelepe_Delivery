const { Router } = require('express');
const userController = require('../controllers/userController');

const routes = Router();

routes.post('/', userController.getUserId);

module.exports = routes;