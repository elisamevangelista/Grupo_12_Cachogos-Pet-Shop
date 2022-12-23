module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategories';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        isbyweight: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: 'subcategories',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    }
    const Subcategories = sequelize.define(alias,cols,config);

    Subcategories.associate = function (models) {
        Subcategories.belongsTo(models.Categories, { // models.Genre -> Genres es el valor de alias en genres.js
            as: "categories",
            foreignKey: "category_id"
        });

        Subcategories.hasMany(models.Products, {
            as: "products",
            foreignKey: "subcategory_id"
        });
    }

    return Subcategories
};