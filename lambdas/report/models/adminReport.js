/**
 * Created by guy on 8/15/18.
 */

module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define('AdminReport', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            wedding_details_completed: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            users_chosen_templates: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            users_with_event: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            published_users: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            users_with_checklist: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            users_with_guestlist: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            tasks_done: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            guests: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }
        },
        {
            tableName: 'admin_reports'
        });
    return Model;
};
