'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('guests', 'rsvp', {
            type: DataTypes.ENUM,
            values: ['coming', 'not_coming', 'unknown'],
            defaultValue: 'unknown'
        });
    },
    down: (queryInterface, Sequelize) => {

    }
};
