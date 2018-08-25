import React, {Component} from 'react';
import Nikahku from './NikahkuApp'
import container from './services/index';
const {Provider} = require('react-redux');

class App extends Component {
    constructor(props) {
        super(props);
        this.store = container.get('store');
    }

    render() {
        return (
            <Provider store={this.store}>
                <Nikahku/>
            </Provider>
        );
    }
}

export default App;
