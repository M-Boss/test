
exports.DefaultReducer = function(key, initialState = {}) {

    return (state = initialState, {type = "", payload={}}) => {
        switch (type) {
            case key:
                //console.log(`default reducer for key ${key}`, payload);
                return {...state, ...payload};
                break;
        }
        return state;
    };
}

exports.buildAction = function(id){
    return function (payload) {
        return {
            type: id,
            payload: payload
        };
    }
}

exports.buildActionForKey = function(id, key){
    return function (payload) {
        let result = {
            type: id,
            payload: {}
        };
        result.payload[key] = payload;
        return result;
    }
}




















