/**
 * Created by guy on 8/17/18.
 */
const sequelizeFactory = require('./external/sequelize/Sequelize');
const Reports = require('./internal/reports');
const Config =  require('./internal/config/Config');
let {Container} = require('js-di-container');
const path = require("path");
const websiteValidator = require('./internal/validations');

let container = new Container();
container.registerFactory('db', sequelizeFactory, {lazy: false});
container.registerClass('config', Config);
container.registerClass('reports', Reports);

container.registerFactory('websiteValidator', function(){
    return websiteValidator;
});
module.exports = container;