/**
 * Created by guy on 8/15/18.
 */

module.exports = function (sequelize, DataTypes) {
    const Checklist = sequelize.define('Checklist', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            initialized: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            traditions: {
                type: DataTypes.JSON,
                defaultValue: [],
                allowNull: true,
            },
        },
        {
            tableName: 'checklists',
        });

    Checklist.associate = function(models) {
        models.Checklist.hasMany(models.Task, {
            as: 'tasks',
            onDelete: 'cascade',
            foreignKey: 'checklist_id'
        });
    };
    return Checklist;
};
