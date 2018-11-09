'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('users', 'guestlist_id', {
            type: DataTypes.INTEGER,
            allowNull: true,
        });
    },
    down: (queryInterface, Sequelize) => {

    }
};

