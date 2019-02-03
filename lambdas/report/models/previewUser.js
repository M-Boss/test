/**
 * Created by guy on 8/15/18.
 */

module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define('PreviewUser', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            template_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }
        },
        {
            tableName: 'preview_users',
        }
    );

    Model.associate = function(models) {
        models.PreviewUser.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
    };

    return Model;
};
