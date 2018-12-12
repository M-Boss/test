'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('payment_tickets', 'name', {
            type: DataTypes.STRING,
            allowNull: true,
        });
    },
    down: (queryInterface, Sequelize) => {

    }
};
