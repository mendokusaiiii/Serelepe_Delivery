module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    underscored: true,
    modelName: 'users',
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'user_id',
    });
  };
  User.associate = (models) => {
    User.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'seller_id',
    });
  };
  
  return User;
};
