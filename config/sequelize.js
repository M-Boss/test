/**
 * Created by guy on 1/3/19.
 */
require('dotenv').config();
const fs = require('fs');
const container = require('../services');
const config = container.get('config');

module.exports = {
    development: {
        username: config.get('mysql.user'),
        password: config.get('mysql.password'),
        database: config.get('mysql.db'),
        host: config.get('mysql.host'),
        port: config.get('mysql.port'),
        dialect: 'mysql'
    },
    test: {
        username: config.get('mysql.user'),
        password: config.get('mysql.password'),
        database: config.get('mysql.db'),
        host: config.get('mysql.host'),
        port: config.get('mysql.port'),
        dialect: 'mysql'
    },
    production: {
        username: config.get('mysql.user'),
        password: config.get('mysql.password'),
        database: config.get('mysql.db'),
        host: config.get('mysql.host'),
        port: config.get('mysql.port'),
        dialect: 'mysql',
        // dialectOptions: {
        //     ssl: {
        //         ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
        //     }
        // }
    }
};