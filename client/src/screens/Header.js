/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image} from 'semantic-ui-react'
import Slider from "react-slick";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux'
import {t} from '../translations'
import MediaQuery from 'react-responsive';
const {buildAction, buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <MediaQuery maxWidth={1024}>
                    <div className="" style={{display: 'flex', alignItems: 'center', padding: 16}}>
                        <div className="" style={{maxWidth: 60}}>
                            <Link to={'/menu'}> <img width={28} height={28}
                                                     src={require('../static/images/menu.svg')}/></Link>
                        </div>
                        <div style={{flex: 1, textAlign: 'center'}}>
                            <a href="/"><img width={160} src={require('../static/images/logo-header.svg')}/></a>
                        </div>
                        <div className="" style={{maxWidth: 60}}>
                            {!this.props.user.token &&
                            <Link to="/login"><p style={{color: '#F3817A'}}>{t("Log In")}</p></Link>}
                            {!!this.props.user.token &&
                            <Link to='/login'><p className="pointer" onClick={() => this.logout()} style={{color: '#F3817A'}}>{t("Logout")}</p></Link>}
                        </div>
                    </div>
                </MediaQuery>


                <MediaQuery minWidth={1024}>
                    <div className="cl-effect-1" style={{display: 'flex', alignItems: 'center', padding: 16, paddingLeft: 24}}>
                        <MenuItem to="/">Home</MenuItem>
                        <MenuItem to="/services">Dashboard</MenuItem>
                        <MenuItem to="/about">{t("About Us")}</MenuItem>
                        <MenuItem to="/contact">{t("Contact Us")}</MenuItem>
                        <MenuItem to="/faqs">FAQs</MenuItem>
                        <a style={{color: '#444', fontWeight: 600, padding: 6, margin: 0}} href="/blog">Blog</a>
                        {
                            this.props.user.email && <MenuItem onClick={() => this.logout()} to="/login">Logout</MenuItem>
                        }
                        {
                            !this.props.user.email && <MenuItem to="/login">Login</MenuItem>
                        }
                        <div style={{flex: 1, textAlign: 'right'}}>
                            <img width={160} src={require('../static/images/logo-header.svg')}/>
                        </div>
                    </div>
                </MediaQuery>
            </React.Fragment>
        )
    }

    logout(){
        let action = buildAction(actions.USER_RECORD);
        this.props.dispatch(action({CLEAR: 1}));
        setTimeout(() => {
            action = buildAction(actions.WEBSITE_RECORD);
            this.props.dispatch(action({CLEAR: 1}));
        }, 300)

    }
}

function MenuItem({to, children, onClick}){
    return (
        <Link onClick={onClick} style={{color: '#444', fontWeight: 600, padding: 6, margin: 0}} to={to}>{children}</Link>
    )
}

export default connect(state => {
    return {
        user: state.user
    }
})(Header)
