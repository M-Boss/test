import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import makeRootReducer from './reducers';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native


const log = createLogger({ diff: true, collapsed: true });

// a function which can create our store and auto-persist the data
export default (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [thunk];
    if (global.__DEV__) {
        middleware.push(log);
    }

    // ======================================================
    // Store Instantiation
    // ======================================================
    let rootReducer = makeRootReducer();
    // const persistConfig = {
    //     key: 'root',
    //     storage,
    //     whitelist: [
    //         'user'
    //     ]
    // };
    // const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware)),
    );
    // persistStore(store);
    return store;
};





