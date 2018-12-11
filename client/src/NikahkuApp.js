import React, {Component} from 'react';
import logo from './logo.svg';

import Login from './screens/Login'
import PasswordRecovery from './screens/PasswordRecovery'
import Menu from './screens/Menu'
import Home from './screens/Home'
import Footer from './screens/Footer'
import Website from './screens/Website'
import Checklist from './screens/Checklist'
import Guestlist from './screens/Guestlist'
import GuestForm from './screens/GuestForm'
import GuestFormCompleted from './screens/GuestFormCompleted'
import Templates from './screens/Templates'
import Welcome from './screens/Welcome'
import Dashboard from './screens/Dashboard'
import Services from './screens/Services'
import Recover from './screens/Recover'
import Reset from './screens/Reset'
import Contact from './screens/Contact'
import About from './screens/About'
import FAQs from './screens/FAQs'
import PremiumTemplates from './screens/PremiumTemplates'

import TemplateHome from './screens/templates/Home'
import TemplatePhotos from './screens/templates/Photos'
import TemplateFAQs from './screens/templates/FAQs'
import TemplateEvents from './screens/templates/Events'
import TemplateMenu from './screens/templates/Menu'

import withTracker from './components/withTracker'
import withTagManager from './components/withTagManager'
import ReactGA from 'react-ga'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter,
    Link
} from 'react-router-dom'
import Header from './screens/Header'
import {Grid} from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App({children}) {
    return (
        <div>
            {children}
            <Footer/>
        </div>
    )
}

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            setTimeout(function(){
                window.scrollTo(0, 0)
                // document.getElementById('app-wrapper').scrollTo(0, 0)
            }, 100)
        }
    }

    render() {
        return this.props.children
    }
}
ScrollToTop = withRouter(ScrollToTop);

class Nikahku extends Component {
    constructor(props){
        super(props)

        //ReactGA.initialize('UA-125055635-1');
    }

    render() {
        return (
            <Router>
                <ScrollToTop>
                    <div id="app-wrapper">
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/menu" component={Menu}/>
                        <Route path="/welcome" component={withTagManager(Welcome)}/>
                        <Route path="/create" component={Website}/>
                        <Route path="/checklist" component={Checklist}/>
                        <Route path="/guestlist" component={Guestlist}/>
                        <Route path="/form/:invitation_token" component={GuestForm}/>
                        <Route path="/guest-form-completed" component={GuestFormCompleted}/>
                        <Route path="/choose_template" component={Templates}/>
                        <Route path="/services" component={Services}/>
                        <Route path="/recover" component={Recover}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/reset/:id/:token" component={Reset}/>
                        <Route path="/about" component={About}/>
                        <Route path="/premium-templates" component={PremiumTemplates}/>
                        <Route path="/faqs" component={FAQs}/>

                        <Switch>
                            <Route path="/wedding/:id/menu" component={TemplateMenu}/>
                            <Route path="/wedding/:id/events" component={TemplateEvents}/>
                            <Route path="/wedding/:id/photos" component={TemplatePhotos}/>
                            <Route path="/wedding/:id/faqs" component={TemplateFAQs}/>
                            <Route path="/wedding/:id" component={TemplateHome}/>
                        </Switch>
                    </div>
                </ScrollToTop>
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
