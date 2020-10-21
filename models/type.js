module.exports = function (sequelize, DataTypes) {
    const petType = sequelize.define("type", {
       type: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    breed.associate = function(models) {
     // breed cannot be made without existing pet
      petType.belongsTo(models.Pet, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  };