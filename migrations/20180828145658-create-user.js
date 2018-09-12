'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('users', {
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
            recovery_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            active: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
}
