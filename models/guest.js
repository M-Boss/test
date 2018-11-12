/**
 * Created by guy on 8/15/18.
 */

module.exports = function (sequelize, DataTypes) {
    const Guest = sequelize.define('Guest', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            guestlist_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'guestlist',
                    key: 'id'
                }
            },
            info: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            plus: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            children: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            total: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            street: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            postal_code: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            relationship: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            mobile: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            definitely_invited:{
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
        },
        {
            tableName: 'guests',
        }
    );

    return Guest;
};
