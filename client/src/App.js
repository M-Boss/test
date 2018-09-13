import React, {Component} from 'react';
import Nikahku from './NikahkuApp'
import container from './services/index';
import {PersistGate} from 'redux-persist/integration/react'
const {Provider} = require('react-redux');


class App extends Component {
    constructor(props) {
        super(props);
        this.store = container.get('store');
        this.persistor = container.get('persistor');
    }

    render() {
        return (
            <Provider store={this.store}>
                <PersistGate loading={null} persistor={this.persistor}>
                    <Nikahku/>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
