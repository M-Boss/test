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
    const TaskTemplate = sequelize.define('TaskTemplate', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
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
            days_before: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            tableName: 'task_templates',
        }
    );

    // User.associate = function(models) {
    //     models.user.belongsToMany(models.topic, {
    //         as: 'topics',
    //         through: models.topicsUsers,
    //         onDelete: 'cascade'
    //     });
    // };
    return TaskTemplate;
};
