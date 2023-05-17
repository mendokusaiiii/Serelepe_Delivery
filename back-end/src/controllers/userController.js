const userService = require('../services/userService');

const getUserId = async (req, res, next) => {
    try {
      const userId = await userService.getUserId(req.body);
      return res.status(200).json({ userId });
    } catch (error) {
      next(error);
    }
  };

  const getAllUsers = async (_req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
  
  const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      return res.status(201).end();
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    getUserId, getAllUsers, deleteUser,
  };
