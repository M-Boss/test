'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('users', 'first_name', {
            type: DataTypes.STRING,
            allowNull: true,
        }).then( () => {
            queryInterface.addColumn('users', 'last_name', {
                type: DataTypes.STRING,
                allowNull: true,
            })
        }).then( () => {
            queryInterface.addColumn('users', 'phone', {
                type: DataTypes.STRING,
                allowNull: true,
            })
        })
    },
    down: (queryInterface, Sequelize) => {

    }
};
