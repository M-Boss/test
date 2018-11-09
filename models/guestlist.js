/**
 * Created by guy on 8/15/18.
 */

module.exports = function (sequelize, DataTypes) {
    const Guestlist = sequelize.define('Guestlist', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            tableName: 'guestlists',
        });

    Guestlist.associate = function(models) {
        models.Guestlist.hasMany(models.Guest, {
            as: 'guests',
            onDelete: 'cascade',
            foreignKey: 'guestlist_id'
        });
    };
    return Guestlist;
};
