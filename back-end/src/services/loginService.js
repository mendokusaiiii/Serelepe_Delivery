const md5 = require('md5');
const { User } = require('../database/models');
const { createToken } = require('../utils/createToken');

const login = async (email, loginPassword) => {
  const userLogin = await User.findOne({ where: { email } });

  if (!userLogin) throw new Error('User not found');
  if (md5(loginPassword) !== userLogin.password) throw new Error('Incorrect password');

  const { password, id, ...userInfo } = userLogin.dataValues;
  return { ...userInfo,
    token: createToken({
     password: userInfo.password, email: userInfo.email, role: userInfo.role }) };
};

module.exports = {
  login,
};
