//create breeds table in connection to pets table
module.exports = function (sequelize, DataTypes) {
    const breed = sequelize.define("breed", {
        breed: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    breed.associate = function(models) {
     // breed cannot be made without existing pet
      breed.belongsTo(models.type, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return breed;
  };