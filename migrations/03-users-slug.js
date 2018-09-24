'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('users', 'slug', {
            type: DataTypes.STRING,
            allowNull: true,
        });
    },
    down: (queryInterface, Sequelize) => {

    }
}
