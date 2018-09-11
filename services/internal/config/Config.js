/**
 * Created by guy on 8/18/18.
 */
const _ = require('lodash')

module.exports = class Config{
    constructor(){

        this.config = {
            app: {
                port: 8090,
                domain: 'http://nikahku.com',
                uploads: "https://nikahku.com/uploads/",
                name: 'Nikahku',
            },

        }
    }

    get(key){
        return _.get(this.config, key);
    }
}