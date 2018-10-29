'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('tasks', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            checklist_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'checklists',
                    key: 'id'
                }
            },
            category: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            notes: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            days_before: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            due: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            done: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tasks');
    }
}
