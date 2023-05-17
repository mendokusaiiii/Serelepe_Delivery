const { Op } = require('sequelize');
const { User } = require('../database/models');

const getUserId = async (data) => {
    const { userEmail } = data;
    const getUser = await User.findOne({ where: { email: userEmail } });
    return getUser;
};

const getAllUsers = async () => User.findAll({ 
    where: { 
      role: { [Op.not]: 'administrator' },
    },
    attributes: { exclude: ['password'] },
  });
  
  const deleteUser = async (id) => User.destroy({ where: { id } });
module.exports = { getUserId, getAllUsers, deleteUser };
