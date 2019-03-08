const _  = require('lodash');

const defaults = {
    development: {
        api_root: 'http://localhost:8080/api/',
        assets: 'https://nikahku-uploads-resized.s3.ap-southeast-1.amazonaws.com/',
    },
    test: {
        api_root: 'http://localhost:8080/api/',
        assets: 'https://nikahku-uploads-resized.s3.ap-southeast-1.amazonaws.com/',
    },
    production: {
        api_root: 'https://www.nikahku.com/api/',
        assets: 'https://nikahku-uploads-resized.s3.ap-southeast-1.amazonaws.com/',
    },
};

const defaultConfig = defaults[process.env.NODE_ENV];

const config = {
    app: {
        api_root: process.env.API_ROOT || defaultConfig['api_root'],
        assets: process.env.ASSETS || defaultConfig['assets'],

        // api_root: 'http://54.251.129.242/api/',
        // assets: 'http://54.251.129.242/assets/',

        // api_root: 'https://www.nikahku.com/api/',
        // assets: 'https://www.nikahku.com/assets/',

        // api_root: 'http://localhost:8080/api/',
        // assets: 'https://nikahku-uploads-resized.s3.ap-southeast-1.amazonaws.com/',
        // assets: 'http://localhost:8080/assets/',
        // assets: 'https://nikahku-uploads.s3.ap-southeast-1.amazonaws.com/',


        // api_root: 'http://192.168.1.10:8080/api/',
        // assets: 'http://192.168.1.10:8080/assets/',
    }
};

module.exports = function(key){
    return _.get(config, key)
};

