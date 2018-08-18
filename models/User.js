/**
 * Created by guy on 8/15/18.
 */

module.exports = function(sequelize, DataTypes) {
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
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password_reset_code: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'NULL'
        },
        active: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        activation_code: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
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
