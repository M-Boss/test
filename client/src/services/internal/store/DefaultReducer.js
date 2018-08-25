export function DefaultReducer(key, initialState = {}) {

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

export function buildAction(id){
    return function (payload) {
        return {
            type: id,
            payload: payload
        };
    }
}

export function buildActionForKey(id, key){
    return function (payload) {
        let result = {
            type: id,
            payload: {}
        };
        result.payload[key] = payload;
        return result;
    }
}




















