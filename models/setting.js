/**
 * Created by guy on 8/15/18.
 */

module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define('Setting', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            key: {
                type: DataTypes.STRING,
                unique: true,
            },

            value: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'settings'
        });

    return Model;
};
