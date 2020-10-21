module.exports = function (sequelize, DataTypes) {
    const Pet = sequelize.define("Pet", {
        name: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: true
            }
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: true
            }
        },
        age: {
            type: DataTypes.INTEGER
        },

        color: {
            type: DataTypes.STRING
        },
        vacinated: {
            type: DataTypes.BOOLEAN
        },
        hobbies: {
            type: DataTypes.STRING
        },

    });
    Pet.associate = function(models) {
        Pet.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    Pet.associate = function (models) {
        Pet.belongsTo(models.breed, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Pet
};