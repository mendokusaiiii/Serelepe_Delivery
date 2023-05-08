const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER 
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER, 
    },
    sellerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    },
    deliveryAddress: {
      allowNull: false,
      type: DataTypes.STRING
    },
    deliveryNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    saleDate: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get: function() {
          return moment.utc(this.getDataValue('sale_date')).format('YYYY-MM-DD HH:mm:ss Z');
      },
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    underscored: true,
    modelName: 'sales',
    timestamps: false,
  });
Sale.associate = (models) => {
  Sale.hasMany(models.SalesProduct, { foreignKey: 'saleId', as: 'sale'});
};

return Sale;
};