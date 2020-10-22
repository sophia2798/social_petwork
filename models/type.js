module.exports = function (sequelize, DataTypes) {
    const petType = sequelize.define("type", {
       type: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    petType.associate = function(models) {
      petType.hasMany(models.Pet, {
        // foreignKey: {
        //   allowNull: false
        // }
      });
  };
  return petType
  };