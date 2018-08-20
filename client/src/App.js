import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './screens/Login'
import PasswordRecovery from './screens/PasswordRecovery'
import Menu from './screens/Menu'
import Home from './screens/Home'

class App extends Component {
    render() {
        return (
            <div className="App">
                <br/>
                <Home/>
            </div>
        );
    }
}

export default App;
