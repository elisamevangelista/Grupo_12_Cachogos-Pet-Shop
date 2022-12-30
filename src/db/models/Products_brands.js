module.exports = (sequelize, dataTypes) => {
    let alias = 'Products_brands';
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
        brand_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
    };
    let config = {
        tableName: 'products_brands',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: false,
        deletedAt: 'deletedAt'
    }
    const Products_brands = sequelize.define(alias,cols,config);

    Products_brands.associate = function (models) {
        Products_brands.belongsTo(models.Products, {
            as: "products",
            foreignKey: "product_sku"
        });
        Products_brands.belongsTo(models.Brands, {
            as: "brands",
            foreignKey: "brand_id"
        });
    }

    return Products_brands
};