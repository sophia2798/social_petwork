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
        breed: {
            type: DataTypes.STRING
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
        // Pet.belongsTo(models.User, {
        //     as: 'pet',
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
        Pet.belongsToMany(models.User, {
            through: 'Favorite',
            as: 'users',
            foreignKey: 'petId'
        });
    };
    
    return Pet
};