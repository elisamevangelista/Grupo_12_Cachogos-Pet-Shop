module.exports = (sequelize, dataTypes) => {
  let alias = "OrderItem";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    product_sku: {
      type: dataTypes.INTEGER(10).UNSIGNED
    },
    name: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
  };
  let config = {
        tableName: 'orderitems',
        paranoid: true,
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
  };

  const OrderItem = sequelize.define(alias, cols, config);

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      as: "order",
      foreignKey: "order_id"
    });

    OrderItem.belongsTo(models.Products, {
      as: "products",
      foreignKey: "product_sku"
    });
  };

  return OrderItem;
};
