import _ from 'lodash'

export default class Config{

    constructor(config){
        this.config = config;
    }

    asset(filename){
        return this.config.get('app.static_root') + filename;
    }
}