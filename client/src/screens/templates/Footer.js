/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image} from 'semantic-ui-react'
import Slider from "react-slick";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux'
const templates = require('./index');

export default class Footer extends Component {
    render() {
        const {theme} = this.props;
        console.log("Theme: ", theme);
        return (
            <React.Fragment>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 12,
                    paddingBottom: 15,
                    backgroundColor: theme.background
                }}>
                    <h5 style={{
                        color: theme.foreground || theme.primary,
                        margin: 0,
                        marginRight: 10,
                        ...theme.footerWithLoveStyle
                    }}>With love by</h5>
                    <a href="/"><img style={{height: 24}} src={require('./one/assets/logo.png')}/></a>
                    <h6 style={{color: theme.primary, margin: 0, flex: 1, textAlign: 'right', textDecoration: 'underline'}}>
                        <Link to='/' style={{...theme.footerAboutStyle}}>
                            About
                        </Link>
                    </h6>
                </div>
                <div style={{backgroundColor: theme.copyright_background || theme.primary, color: theme.copyright_foreground || theme.foreground || '#FFF', padding: 12}}>
                    Copyright © Nikahku 2018
                </div>
            </React.Fragment>
        )
    }
}