import {Container} from './di/'
//
import createStore from './internal/store/index'
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

const store = createStore();
container.registerFactory('store', function(){
    return store.store;
});

container.registerFactory('persistor', function(){
    return store.persistor;
});

export default container;