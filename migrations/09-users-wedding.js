'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('users', 'wedding_date', {
            type: DataTypes.DATEONLY,
            allowNull: true
        });
    },
    down: (queryInterface, Sequelize) => {

    }
}
