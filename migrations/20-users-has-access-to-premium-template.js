'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('users', 'has_access_to_premium_template', {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        });
    },
    down: (queryInterface, Sequelize) => {

    }
};
