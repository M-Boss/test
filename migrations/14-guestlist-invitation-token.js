'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('guestlists', 'invitation_token', {
            type: DataTypes.STRING,
            allowNull: true,
        });
    },
    down: (queryInterface, Sequelize) => {

    }
};

