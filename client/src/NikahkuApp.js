import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './screens/Login'
import PasswordRecovery from './screens/PasswordRecovery'
import Menu from './screens/Menu'
import Home from './screens/Home'
import Footer from './screens/Footer'
import Website from './screens/Website'
import Templates from './screens/Templates'
import Welcome from './screens/Welcome'
import Dashboard from './screens/Dashboard'

import TemplateHome from './screens/templates/Home'
import TemplatePhotos from './screens/templates/Photos'
import TemplateFAQs from './screens/templates/FAQs'
import TemplateEvents from './screens/templates/Events'
import TemplateMenu from './screens/templates/Menu'
import {
    BrowserRouter as Router,
    Route,
    Switch,
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
                <div style={{width: 380, margin: 'auto'}}>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/menu" component={Menu}/>
                    <Route path="/welcome" component={Welcome}/>
                    <Route path="/create" component={Website}/>
                    <Route path="/choose_template" component={Templates}/>

                    <Switch>
                        <Route path="/w/:id/menu" component={TemplateMenu}/>
                        <Route path="/w/:id/events" component={TemplateEvents}/>
                        <Route path="/w/:id/photos" component={TemplatePhotos}/>
                        <Route path="/w/:id/faqs" component={TemplateFAQs}/>
                        <Route path="/w/:id" component={TemplateHome}/>
                    </Switch>

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
