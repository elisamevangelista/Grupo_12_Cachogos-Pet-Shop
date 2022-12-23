module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        animalType: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    };
    let config = {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    }
    const Categories = sequelize.define(alias,cols,config);

    Categories.associate = function (models) {
        Categories.hasMany(models.Subcategories, {
            as: "subcategories",
            foreignKey: "subcategory_id"
        });
    }

    return Categories
};