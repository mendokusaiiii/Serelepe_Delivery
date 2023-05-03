const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginService.login(email, password);
  res.status(200).json(user);
};

module.exports = {
  login,
};