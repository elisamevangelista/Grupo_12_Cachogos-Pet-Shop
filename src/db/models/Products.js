module.exports = (sequelize, dataTypes) => {
    let alias = 'Products'; // esto debería estar en singular
    let cols = {
        sku: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        quotesQuantity: {
            type: dataTypes.INTEGER(10).UNSIGNED
        },
        stock: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        cost: {
            type: dataTypes.DECIMAL(10, 0).UNSIGNED,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER(10).UNSIGNED
        },
        subcategory_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: 'products',
        paranoid: true,
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    }
    const Products = sequelize.define(alias,cols,config);

    Products.associate = function (models) {
        Products.belongsTo(models.Subcategories, {
            as: "subcategories",
            foreignKey: "subcategory_id"
        });

        Products.hasMany(models.Products_images, {
            as: "products_images",
            foreignKey: "product_sku"
        });

        Products.hasMany(models.Foods, {
            as: "foods",
            foreignKey: "product_sku"
        });

        Products.belongsToMany(models.Brands, {
            as: "brands",
            through: 'products_brands',
            foreignKey: 'product_sku',
            otherKey: 'brand_id',
            timestamps: false
        });

        Products.belongsToMany(models.Users, {
            as: "users",
            through: 'carts',
            foreignKey: 'product_sku',
            otherKey: 'user_id',
            timestamps: false
        });
    }

    return Products
};