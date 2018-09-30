/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image, Icon} from 'semantic-ui-react'
import Slider from "react-slick";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="" style={{backgroundColor: this.props.themeColor, display:'flex', alignItems: 'center', padding: 16}}>
                <div  style={{flex: 1}}>
                    <p style={{color: '#FFF', fontSize: 16}}>{this.props.label}</p>
                </div>
                <div className="" style={{maxWidth: 60}}>
                    <Link to={`/wedding/${this.props.websiteId}/menu`}>
                        <Icon name="bars"/>
                        {/*<img width={28} height={28} src={require('../../../static/images/menu.svg')}/>*/}
                    </Link>
                </div>
            </div>
        )
    }
}