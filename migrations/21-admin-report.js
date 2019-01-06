'use strict';
// module.exports = {
//     up: (queryInterface, DataTypes) => {
//         return queryInterface.createTable('admin_reports', {
//             id: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 primaryKey: true,
//                 autoIncrement: true
//             },
//             user_count: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 defaultValue: 0,
//             },
//             wedding_details_completed: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 defaultValue: 0,
//             },
//             users_chosen_templates: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 defaultValue: 0,
//             },
//             users_with_event: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 defaultValue: 0,
//             },
//             published_users: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 defaultValue: 0,
//             },
//             users_with_checklist: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 defaultValue: 0,
//             },
//             users_with_guestlist: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 defaultValue: 0,
//             },
//             createdAt: {
//                 allowNull: false,
//                 type: DataTypes.DATE
//             },
//             updatedAt: {
//                 allowNull: true,
//                 type: DataTypes.DATE
//             }
//         });
//     },
//     down: (queryInterface, Sequelize) => {
//         return queryInterface.dropTable('admin_reports');
//     }
// };