/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Segment, Button, Form, Grid, Input, Image} from 'semantic-ui-react'
import Slider from "react-slick";
// import Footer from "./Footer";
import {H1} from "../../../components/Headers";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from './Header'
import moment from 'moment'
import config from '../../../services/internal/config/Config';


class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const website = this.props.website;
        return <div>
            <Header websiteId={this.props.websiteId} label={website.bride_first + " & " + website.groom_first}/>
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

export default connect(state => {
    return {
        user: state.user
    }
})(Menu);