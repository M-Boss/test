'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('admin_reports', 'guests', {
            type: DataTypes.INTEGER,
            defaultValue: 0
        });
    },
    down: (queryInterface, Sequelize) => {

    }
};
