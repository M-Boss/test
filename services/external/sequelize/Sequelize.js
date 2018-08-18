/**
 * Created by guy on 8/15/18.
 */
import fs from 'fs';
import path from 'path';
const Sequelize = require('sequelize');

module.exports = function(container, config){
    const basename  = path.basename(__filename);
    const db = {};
    const sequelize = new Sequelize('database', 'username', 'password', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        // SQLite only
        // storage: 'path/to/database.sqlite'
    });
    // const sequelize = new Sequelize(options);

    loadModels(db, sequelize);

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    return db;
};


function loadModels(db, sequelize){
    const modelsPath = path.join(__dirname, '../../../models');
    fs.readdirSync(modelsPath)
        .filter(file => {
            return (file.indexOf('.') !== 0) &&
                (file !== basename) &&
                (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const model = sequelize['import'](path.join(modelsPath, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
}