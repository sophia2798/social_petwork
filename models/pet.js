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
        profilePic: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.INTEGER
        },

        color: {
            type: DataTypes.STRING
        },
        vaccinated: {
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
        Pet.belongsTo(models.breed, {
            foreignKey: {
                allowNull: true
            }
        });
        Pet.belongsTo(models.type, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    // Pet.associate = function (models) {
    // };

    // Pet.associate = function (models) {
    //     Pet.hasOne(models.type, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return Pet
};