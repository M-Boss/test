/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image} from 'semantic-ui-react'
import Slider from "react-slick";

export default class Footer extends Component {


    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return <Grid centered columns={1}>
            <Grid.Column style={{maxWidth: 480, textAlign: 'center'}}>
                <section className="inverted" style={{backgroundColor: '#27434F',paddingBottom: 60, paddingTop: 32, paddingLeft: 32, paddingRight: 32}}>
                    <img width={130} src={require('../static/images/logo_white.svg')} alt="Nikahku logo" />
                    <p style={{fontSize: 13, color:'#4B6975', marginTop: 12, marginBottom: 48}}>Copyright © Nikahku, 2018 </p>

                    <MenuItem>Home</MenuItem>
                    <MenuItem>Templates</MenuItem>
                    <MenuItem>About Us</MenuItem>
                    <MenuItem>Contact Us</MenuItem>
                    <MenuItem>FAQs</MenuItem>

                </section>
            </Grid.Column>
        </Grid>
    }
}


function MenuItem(props){
    return (<p style={{marginTop: 28, fontSize: 16}}>{props.children}</p>)
}