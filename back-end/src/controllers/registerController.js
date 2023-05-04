const registerService = require('../services/registerService');

const userRegister = async (req, res, next) => {
  const register = req.body;
  try {
    const newRegister = await registerService.userRegister(register);
    return res.status(201).json(newRegister);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
};