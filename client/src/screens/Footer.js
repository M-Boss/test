/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image} from 'semantic-ui-react'
import Slider from "react-slick";
import {Link} from 'react-router-dom'
import {t} from '../translations'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div style={{maxWidth: 480, textAlign: 'center'}}>
            <section className="inverted" style={{
                backgroundColor: '#27434F',
                paddingBottom: 60,
                paddingTop: 32,
                paddingLeft: 32,
                paddingRight: 32
            }}>
                <img width={130} src={require('../static/images/logo_white.svg')} alt="Nikahku logo"/>
                <p style={{fontSize: 13, color: '#4B6975', marginTop: 12, marginBottom: 48}}>Copyright © Nikahku,
                    2018 </p>

                <MenuItem link="/">Home</MenuItem>
                <MenuItem link="/services">Dashboard</MenuItem>
                <MenuItem link="/about">{t("About Us")}</MenuItem>
                <MenuItem link="/faqs">FAQs</MenuItem>
                <MenuItem link="/contact">{t("Contact Us")}</MenuItem>
                <a style={{color: '#FFF', paddingTop: 14, paddingBottom: 14, fontSize: 16, display: 'block'}} href="/blog">Blog</a>
            </section>
        </div>
    }
}

function MenuItem(props) {
    return (<Link  to={props.link}><p style={{paddingTop: 14, paddingBottom: 14, fontSize: 16}}>{props.children}</p></Link>)
}