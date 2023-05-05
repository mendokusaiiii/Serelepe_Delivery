'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      url_image: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  },
};