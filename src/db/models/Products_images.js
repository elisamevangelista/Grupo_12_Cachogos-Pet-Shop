module.exports = (sequelize, dataTypes) => {
    let alias = 'Products_images';
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
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
    };
    let config = {
        tableName: 'products_images',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    }
    const Products_images = sequelize.define(alias,cols,config);

    Products_images.associate = function (models) {
        Products_images.belongsTo(models.Products, {
            as: "products",
            foreignKey: "product_sku"
        });
    }

    return Products_images
};