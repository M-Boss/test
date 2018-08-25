import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './screens/Login'
import PasswordRecovery from './screens/PasswordRecovery'
import Menu from './screens/Menu'
import Home from './screens/Home'
import Footer from './screens/Footer'
import Website from './screens/Website'
import Welcome from './screens/Welcome'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Header from './screens/Header'
import {Grid} from 'semantic-ui-react'

function App({children}) {
    return (
        <div>
            {children}
            <Footer/>
        </div>
    )
}

class Nikahku extends Component {
    render() {
        return (
            <Router>
                <div style={{ width: 380, margin: 'auto'}}>
                    <Header />
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/menu" component={Menu}/>
                    <Route path="/welcome" component={Welcome}/>
                    <Route path="/create" component={Website}/>
                </div>
            </Router>
        );
    }
}

/*
 <div className="App">
 <br/>
 <Welcome/>
 </div>
 */
export default Nikahku;
