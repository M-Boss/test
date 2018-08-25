import _ from 'lodash'

export default class Config{

    constructor(){
        this.config = {
            app: {
                api_root: 'http://new.offfood.ir/api/'
            }
        }
    }

    get(key){
        return _.get(this.config, key);
    }
}