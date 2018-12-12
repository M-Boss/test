/**
 * Created by guy on 8/15/18.
 */

module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define('PaymentTicket', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            tableName: 'payment_tickets'
        });

    Model.associate = function(models) {
        models.PaymentTicket.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
    };
    return Model;
};
