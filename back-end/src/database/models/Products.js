module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
     id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER 
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  url_image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  }, {
  underscored: true,
  modelName: 'products',
  timestamps: false,
});

Product.associate = (models) => {
  Product.hasMany(models.SalesProduct, { foreignKey: 'productId', as: 'product'});
};

return Product;
};