'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('users', 'activation_code', {
            type: DataTypes.STRING,
            allowNull: true,
        });
    },
    down: (queryInterface, Sequelize) => {

    }
}
