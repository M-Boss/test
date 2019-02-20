'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('admin_reports', 'tasks_done', {
            type: DataTypes.INTEGER,
            defaultValue: 0
        });
    },
    down: (queryInterface, Sequelize) => {

    }
};
