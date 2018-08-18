/**
 * Created by guy on 8/17/18.
 */
import sequelizeFactory from './external/sequelize/Sequelize'
let {Container} = require('js-di-container');

let container = new Container();
container.registerFactory('db', sequelizeFactory);