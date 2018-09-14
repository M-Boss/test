/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Segment, Button, Form, Grid, Input} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleItemClick(page) {

    }

    render() {
        return <div>
            <Grid centered columns={1}>
                <Grid.Column style={{marginTop: 48, maxWidth: 400, textAlign: 'center'}} >
                    <MenuItem to="/">Home</MenuItem>
                    <MenuItem to="/dashboard">Your Website</MenuItem>
                    <MenuItem to="/about">About Us</MenuItem>
                    <MenuItem to="/contact">Contact Us</MenuItem>
                    <MenuItem to="/faq">FAQs</MenuItem>
                </Grid.Column>
            </Grid>
        </div>
    }
}


function MenuItem({children, to}){
    return (<Link to={to}> <p style={{marginTop: 28, fontSize: 16}}>{children}</p></Link>)
}