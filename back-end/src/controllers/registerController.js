const registerService = require('../services/registerService');

const userRegister = async (req, res) => {
  const register = req.body;
  const newRegister = await registerService.userRegister(register);
  return res.status(201).json(newRegister);
};

module.exports = {
  userRegister,
};
