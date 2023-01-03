module.exports = (sequelize, dataTypes) => {
    let alias = 'Users'; // esto debería estar en singular
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
        surname: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(128),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255)
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        userType: {
            type: dataTypes.ENUM('user', 'admin'),
            allowNull: false
        }
    };
    let config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    }
    const Users = sequelize.define(alias,cols,config);

    Users.associate = function (models) {

        Users.belongsToMany(models.Products, {
            as: "products",
            through: 'carts',
            foreignKey: 'user_id',
            otherKey: 'product_sku',
            timestamps: false
        });
    }

    return Users
};