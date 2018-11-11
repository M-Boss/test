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
            slug: {
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
            },
            checklist_id: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            guestlist_id: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            wedding_date: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        },
        {
            tableName: 'users'
        });

    User.associate = function(models) {
        models.User.belongsTo(models.Checklist, {
            as: 'checklist',
            foreignKey: 'checklist_id'
        });

        models.User.belongsTo(models.Guestlist, {
            as: 'guestlist',
            foreignKey: 'guestlist_id'
        });
    };
    return User;
};
