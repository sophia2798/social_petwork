module.exports = function (sequelize, DataTypes) {
    const Favorite = sequelize.define("Favorite", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          }
    });
    
    return Favorite
};