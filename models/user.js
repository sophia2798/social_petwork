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
        zip: DataTypes.INTEGER
    });
    User.associate = function (models) {
        User.hasMany(models.Pet, {
            onDelete: "cascade"
        });
    };
    return User
};