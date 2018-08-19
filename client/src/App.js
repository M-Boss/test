import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './screens/Login'

class App extends Component {
    render() {
        return (
            <div className="App">
                <br/>
                <Login/>
            </div>
        );
    }
}

export default App;
