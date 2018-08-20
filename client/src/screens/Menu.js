/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Segment, Button, Form, Grid, Input} from 'semantic-ui-react'

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
                    <MenuItem>Home</MenuItem>
                    <MenuItem>Templates</MenuItem>
                    <MenuItem>About Us</MenuItem>
                    <MenuItem>Contact Us</MenuItem>
                    <MenuItem>FAQs</MenuItem>
                </Grid.Column>
            </Grid>
        </div>
    }
}


function MenuItem(props){
    return (<p style={{marginTop: 28, fontSize: 16}}>{props.children}</p>)
}