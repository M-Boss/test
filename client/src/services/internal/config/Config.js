import _ from 'lodash'

export default class Config{

    constructor(){
        this.config = {
            app: {
                api_root: 'http://nikahku.com/api/',
                static_root: 'http://nikahku.com/static/',
            }
        }
    }

    get(key){
        return _.get(this.config, key);
    }
}