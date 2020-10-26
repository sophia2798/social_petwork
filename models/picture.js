module.exports = function (sequelize, DataTypes) {
    const Picture = sequelize.define("Picture", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pictureUrl: {
            type: DataTypes.STRING(510),
            validate: {
                isUrl: true,
            }
        },
        petId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        profilePic: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Picture
};