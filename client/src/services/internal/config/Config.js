import _ from 'lodash'

const config = {
    app: {
        api_root: 'http://nikahku.com/api/',
        assets: 'http://localhost:8080/assets/',
    }
};

export default function(key){
    return _.get(config, key)
};
