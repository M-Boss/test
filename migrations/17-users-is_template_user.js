'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('users', 'is_template_user', {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        });
    },
    down: (queryInterface, Sequelize) => {

    }
};
