/**
 * Created by guy on 8/15/18.
 */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = function(container, config){


    const db = {};
    const sequelize = new Sequelize('homestead', 'homestead', 'secret', {
        host: 'database',
        dialect: 'mysql',
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
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
    const basename  = path.basename(__filename);

    const modelsPath = path.join(__dirname, '../../../models');
    console.log(modelsPath);
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