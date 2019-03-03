/**
 * Created by guy on 8/18/18.
 */
const _ = require('lodash');
const path = require('path');

module.exports = class Config{
    constructor(){

        this.config = {
            app: {
                port: 8090,
                domain: process.env.APP_DOMAIN || 'http://localhost:8080/',
                uploads: process.env.APP_UPLOADS,
                name: 'Nikahku',
                email: process.env.APP_EMAIL || 'contact@nikahku.com',
                preview_user: parseInt(process.env.PREVIEW_USER) || 25,
                localUploadDirectory: path.join(__dirname, "../../../public/uploads"),
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
            },
            aws: {
                accessKey: process.env.AWS_ACCESS_KEY_ID,
                secretKey: process.env.AWS_SECRET_ACCESS_KEY,
                uploadBucket: process.env.AWS_UPLOAD_BUCKET || 'nikahku-uploads',
            }
        };

        console.log(this.config);
    }

    get(key){
        return _.get(this.config, key);
    }
};
