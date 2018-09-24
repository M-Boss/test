import _ from 'lodash'

const config = {
    app: {
        api_root: 'http://54.251.129.242/api/',
        assets: 'http://54.251.129.242/assets/',
        // api_root: 'http://localhost:8080/api/',
        // assets: 'http://localhost:8080/assets/',
    }
};

export default function(key){
    return _.get(config, key)
};
