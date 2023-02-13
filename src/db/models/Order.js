module.exports = (sequelize, dataTypes) => {
  let alias = "Order";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    total: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: dataTypes.STRING(25),
      allowNull: false,
    },
    shippingMethod: {
      type: dataTypes.STRING(25),
      allowNull: true,
    },
  };
  let config = {
        tableName: 'orders',
        paranoid: true,
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
  };

  const Order = sequelize.define(alias, cols, config);

  Order.associate = (models) => {
    Order.Users = Order.belongsTo(models.Users, {
      as: "users",
      foreignKey: "user_id",
    });
    Order.OrderItems = Order.hasMany(models.OrderItem, {
      as: "orderItems",
      foreignKey: 'order_id'
    });
  };

  return Order;
};
