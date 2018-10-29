'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('users', 'checklist_id', {
            type: DataTypes.INTEGER,
            allowNull: true,
        });
    },
    down: (queryInterface, Sequelize) => {

    }
};
