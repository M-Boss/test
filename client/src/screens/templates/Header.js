/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image, Icon} from 'semantic-ui-react'
import Slider from "react-slick";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux'
const templates = require('./index');

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {theme = {}}= this.props;
        let extraStyle = {};
        if(this.props.backgroundImage){
            extraStyle.backgroundImage = `url(${this.props.backgroundImage})`;
        }
        return (
            <div className="" style={{
                position: 'fixed', top: 0, left: 0, right: 0, height: 61, zIndex: 2000,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',backgroundPosition: 'top right',
                backgroundColor: theme.headerBackground || this.props.themeColor,
                display:'flex', alignItems: 'center', padding: 16,
                ...theme.headerContainerStyles, ...extraStyle
            }}>
                {!theme.headerHideNames && <div  style={{flex: 1}}>
                    <p style={{textAlign: 'left', color: theme.headerForeground || theme.foreground || '#FFF', fontSize: theme.headerFontSize || 16}}>{this.props.label}</p>
                </div>}

                <div className="" style={{maxWidth: 60}}>
                    <Link style={{}} to={`/wedding/${this.props.websiteId}/menu`}>
                        {this.props.icon ? <img style={{height: theme.headerBurgerSize || 32}} src={this.props.icon} />
                            : <Icon style={{lineHeight: '28px', fontSize: 28, color: theme.foreground || 'white'}} name="bars"/>}
                    </Link>
                </div>

            </div>
        )
    }
}

export default connect(state => {
    return {
        user: state.user
    }
})(Header)
