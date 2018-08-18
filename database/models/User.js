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
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recovery_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        active: {
            type: DataTypes.INTEGER,
            defaultValue: 1
    }},
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
