const loginService = require('../services/loginService');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
     const user = await loginService.login(email, password); 
     res.status(200).json(user);
} catch (error) {
      next(error);
     }
};

module.exports = {
  login,
};