module.exports = (sequelize, dataTypes) => {
    let alias = 'Foods';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_sku: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        weight: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        cost_x_bag: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        quotesQuantity: {
            type: dataTypes.INTEGER(10).UNSIGNED
        },
    };
    let config = {
        tableName: 'foods',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    }
    const Foods = sequelize.define(alias,cols,config);

    Foods.associate = function (models) {
        Foods.belongsTo(models.Products, {
            as: "products",
            foreignKey: "product_sku"
        });
    }

    return Foods
};