/**
 * Created by guy on 8/18/18.
 */
const _ = require('lodash');

module.exports = class Config{
    constructor(){

        this.config = {
            app: {
                port: 8090,
                domain: process.env.APP_DOMAIN || 'http://localhost:8080/',
                uploads: process.env.APP_UPLOADS ||  "http://nikahku-rds.cdnpjuqnhltl.ap-southeast-1.rds.amazonaws.com/uploads/",
                name: 'Nikahku',
                email: process.env.APP_EMAIL || 'sharonhalim18@gmail.com',
                preview_user: parseInt(process.env.PREVIEW_USER) || 25,
            },
            mysql: {
                host: process.env.DB_HOST || "",
                db: process.env.DB_DB ||  "homestead",
                user: process.env.DB_USER ||  "sharon",
                password: process.env.DB_PASSWORD ||  "secret",
                port: process.env.DB_PORT ||  3306
                // host: "",
                // db: "homestead",
                // user: "homestead",
                // password: "secret",
                // port: 33061
            }
        };

        console.log(this.config);
    }

    get(key){
        return _.get(this.config, key);
    }
};
