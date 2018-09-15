/**
 * Created by guy on 8/18/18.
 */
const _ = require('lodash')

module.exports = class Config{
    constructor(){

        this.config = {
            app: {
                port: 8090,
                domain: 'http://nikahku-rds.cdnpjuqnhltl.ap-southeast-1.rds.amazonaws.com/',
                uploads: "http://nikahku-rds.cdnpjuqnhltl.ap-southeast-1.rds.amazonaws.com/uploads/",
                name: 'Nikahku',
            },
            mysql: {
                host: "nikahku-rds.cdnpjuqnhltl.ap-southeast-1.rds.amazonaws.com",
                db: "homestead",
                user: "sharon",
                password: "jskk((282ja88DD",
                port: 3306
                // host: "",
                // db: "homestead",
                // user: "homestead",
                // password: "secret",
                // port: 33061
            }

        }
    }

    get(key){
        return _.get(this.config, key);
    }
}