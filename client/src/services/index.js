const {Container} = require('./di/')
//
const createStore = require('./internal/store/index')
// import Config from './internal/config/Config'
// import Users from './internal/users/Users'
// import URL from './internal/helpers/URL'
let container = new Container();
// container.registerClass('config', Config);
// // container.registerClass('users', Users);
// // container.registerClass('url', URL);
// container.registerFactory('rest', function(container, config){
//     return new RestFetch(config.get('app.api_root'));
// });
//

var store = null;
try {
    store = createStore();
}
catch (e){

}
container.registerFactory('store', function(){
    return store.store;
});

container.registerFactory('persistor', function(){
    return store.persistor;
});

module.exports = container;