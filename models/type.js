module.exports = function (sequelize, DataTypes) {
    const petType = sequelize.define("type", {
       type: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    petType.associate = function(models) {
     // breed cannot be made without existing pet
      petType.hasMany(models.breed, {
        foreignKey: {
          allowNull: false
        }
      });
  };
  return petType
  };