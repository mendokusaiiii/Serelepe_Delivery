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

const getSellers = async (_req, res, next) => {
  try {
    const sellers = await registerService.getSellers();
    return res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
  getSellers,
};