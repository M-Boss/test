/**
 * Created by guy on 8/15/18.
 */

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                }
            },
            website: {
                type: DataTypes.JSON,
                defaultValue: {},
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            recovery_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            activation_code: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            active: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {
            tableName: 'users'
        });

    // User.associate = function(models) {
    //     models.user.belongsToMany(models.topic, {
    //         as: 'topics',
    //         through: models.topicsUsers,
    //         onDelete: 'cascade'
    //     });
    // };
    return User;
};
