module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    underscored: true,
    modelName: 'sales_products',
    timestamps: false,
  });
  
  SalesProduct.associate = (models) => {
    SalesProduct.belongsTo(models.Sale, { foreignKey: 'saleId', as: 'sale'});
    SalesProduct.belongsTo(models.Product, { foreignKey: 'productId', as: 'product'});
  };

  return SalesProduct;
};