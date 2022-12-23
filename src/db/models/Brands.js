module.exports = (sequelize, dataTypes) => {
    let alias = 'Brands';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        brand: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    };
    let config = {
        tableName: 'brands',
        timestamps: true,
        createdAt: 'createdAt', //'createdAt' es el nombre de la columna
        deletedAt: 'deletedAt'
    }
    const Brands = sequelize.define(alias,cols,config);

    Brands.associate = function (models) {
        Brands.belongsToMany(models.Products, {
            as: "products",
            through: 'products_brands',
            foreignKey: 'brand_id',
            otherKey: 'product_sku',
            timestamps: true
        });
    }

    return Brands
};