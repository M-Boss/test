/**
 * Created by guy on 8/17/18.
 */
const sequelizeFactory = require('./external/sequelize/Sequelize');
const UsersDatabase = require('./internal/users/UsersDatabase');
const Random = require('./internal/helpers/Random');
const Hasher = require('./internal/helpers/Hasher');
// import Helpers from './internal/helpers/Helpers'
const Config =  require('./internal/config/Config')
// import MailerConsole from "./external/mailer/MailerConsole";
let {Container} = require('js-di-container');
// const EventEmitter = require('events');


let container = new Container();
container.registerFactory('db', sequelizeFactory, {lazy: false});
container.registerClass('users', UsersDatabase);
container.registerClass('random', Random);
// container.registerClass('helper', Helper);
container.registerClass('hasher', Hasher);
// container.registerClass('helpers', Helpers);
container.registerClass('config', Config);
// container.registerClass('mailer', MailerConsole);
//
//
// class MyEmitter extends EventEmitter {}
// container.registerFactory('emitter', function(){
//     return new MyEmitter();
// });

module.exports = container;