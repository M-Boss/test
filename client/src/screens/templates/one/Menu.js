/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Segment, Button, Form, Grid, Input, Image, Icon} from 'semantic-ui-react'
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
        return (<div style={{textAlign: 'center'}}>
                    <div style={{textAlign: 'right', marginTop: 10}}>
                        <Icon style={{width: 32, height: 32, fontSize: 22}} name='close' />
                    </div>
                    <MenuItem to={"/w/" + this.props.websiteId}>Home</MenuItem>
                    <MenuItem to={"/w/" + this.props.websiteId + "/events"}>Events</MenuItem>
                    <MenuItem to={"/w/" + this.props.websiteId + "/photos"}>Photos</MenuItem>
                    <MenuItem to={"/w/" + this.props.websiteId + "/faqs"}>FAQs</MenuItem>
        </div>)
    }
}

function MenuItem({children, to}){
    return (<Link to={to}> <p style={{color: '#6c86a1', marginTop: 28, fontSize: 18, fontWeight: 'bold'}}>{children}</p></Link>)
}

export default connect(state => {
    return {
        user: state.user,
    }
})(Menu);