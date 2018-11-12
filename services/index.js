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
const Time = require('./internal/helpers/Time');
// import Helpers from './internal/helpers/Helpers'
const Config =  require('./internal/config/Config')
// import MailerConsole from "./external/mailer/MailerConsole";
let {Container} = require('js-di-container');
const EventEmitter = require('events');

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

class MyEmitter extends EventEmitter {}
container.registerFactory('emitter', function(){
    return new MyEmitter();
});
//load event handlers
require('../events/userEvents')(container, container.get('emitter'));

module.exports = container;