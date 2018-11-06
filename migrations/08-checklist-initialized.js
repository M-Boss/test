'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('checklists', 'initialized', {
            type: DataTypes.INTEGER,
            defaultValue: 0
        });
    },
    down: (queryInterface, Sequelize) => {

    }
};
