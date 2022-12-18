module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories';
    let cols = {
        id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
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
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: false
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