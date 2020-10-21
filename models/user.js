const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING,
            isAlpha: true,
        },
        last_name: {
            type: DataTypes.STRING,
            isAlpha: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        zip: DataTypes.INTEGER
    });

    User.associate = function (models) {
        User.hasMany(models.Pet, {
            onDelete: "cascade"
        });
    };

    User.beforeCreate(function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10),null);
    });

    return User
};