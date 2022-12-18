module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategories';
    let cols = {
        id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
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
            type: dataTypes.INT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: false
    }
    const Subcategories = sequelize.define(alias,cols,config);

    Subcategories.associate = function (models) {
        Subcategories.belongsTo(models.Categories, { // models.Genre -> Genres es el valor de alias en genres.js
            as: "categories",
            foreignKey: "category_id"
        });
    }

    return Subcategories
};