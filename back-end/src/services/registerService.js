const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const { createToken } = require('../utils/createToken');

const userRegister = async (data) => {
  const { name, email, password, role = 'customer' } = data;

  const user = await User.findOne({ where: { 
    [Op.or]: [
      { email },
      { name },
    ],
  } });

  if (user) throw new Error('User already exist');

  const createdToken = createToken(name, email, role);

  const encryptedPassword = md5(password);
  await User.create({
    name,
    email,
    password: encryptedPassword,
    role,
  });

  return { name, email, role, createdToken };
};

module.exports = {
  userRegister,
};
