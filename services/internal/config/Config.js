/**
 * Created by guy on 8/18/18.
 */
const _ = require('lodash')

export default class Config{
    constructor(){

        this.config = {
            app: {
                port: 8090,
                domain: 'nikahku.com',
                name: 'Nikahku',
            },

        }
    }

    get(key){
        return _.get(this.config, key);
    }
}