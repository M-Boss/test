/**
 * Created by guy on 8/17/18.
 */
const sequelizeFactory = require('./external/sequelize/Sequelize');
const UsersDatabase = require('./internal/users/UsersDatabase');
const ChecklistsDatabase = require('./internal/checklists');
const GuestlistDatabase = require('./internal/guestlists');
const Random = require('./internal/helpers/Random');
const Hasher = require('./internal/helpers/Hasher');
const MailerAWS = require('./external/mailer/MailerAWS');
const Cleaner = require('./internal/helpers/Cleaner');
const Settings = require('./internal/settings');
const Time = require('./internal/helpers/Time');
const Reports = require('./internal/reports');
const Events = require('./internal/events');
// import Helpers from './internal/helpers/Helpers'
const Config =  require('./internal/config/Config');
// import MailerConsole from "./external/mailer/MailerConsole";
let {Container} = require('js-di-container');
const EventEmitter = require('events');
const websiteValidator = require('../client/src/services/internal/validations');
const path = require("path");

let container = new Container();
container.registerFactory('db', sequelizeFactory, {lazy: false});
container.registerClass('users', UsersDatabase);
container.registerClass('checklists', ChecklistsDatabase);
container.registerClass('guestlists', GuestlistDatabase);
container.registerClass('random', Random);
container.registerClass('mailer', MailerAWS);
container.registerClass('hasher', Hasher);
container.registerClass('cleaner', Cleaner);
container.registerClass('config', Config);
container.registerClass('time', Time);
container.registerClass('settings', Settings);
container.registerClass('reports', Reports);

container.registerFactory('websiteValidator', function(){
    return websiteValidator;
});

container.registerFactory('events', function(){
    return new Events(path.join(__dirname, '..', 'observers'));
});

class MyEmitter extends EventEmitter {}
container.registerFactory('emitter', function(){
    return new MyEmitter();
});
//load event handlers
require('../events/userEvents')(container, container.get('emitter'));

module.exports = container;