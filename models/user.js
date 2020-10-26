const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        bio:{
            type: DataTypes.TEXT,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        zip: DataTypes.INTEGER
    });

    User.associate = function (models) {
        User.belongsToMany(models.Pet, {
            through: 'Favorite',
            as: 'favorite_pets',
            foreignKey: 'userId'
        });
        User.hasMany(models.Pet, {
            onDelete: "cascade"
        });
    };

    User.beforeCreate(function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10),null);
    });

    return User
};