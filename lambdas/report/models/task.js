/**
 * Created by guy on 8/15/18.
 */

module.exports = function (sequelize, DataTypes) {
    /*
     title
     desc
     due
     notes
     done
     */
    const Task = sequelize.define('Task', {
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
                    model: 'checklist',
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
            }
        },
        {
            tableName: 'tasks',
        }
    );

    // User.associate = function(models) {
    //     models.user.belongsToMany(models.topic, {
    //         as: 'topics',
    //         through: models.topicsUsers,
    //         onDelete: 'cascade'
    //     });
    // };
    return Task;
};
