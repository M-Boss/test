/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image} from 'semantic-ui-react'
import Slider from "react-slick";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="" style={{backgroundColor: '#72859a', display:'flex', alignItems: 'center', padding: 16}}>
                <div  style={{flex: 1}}>
                    <p style={{color: '#FFF', fontSize: 16}}>{this.props.label}</p>
                </div>
                <div className="" style={{maxWidth: 60}}>
                    {/*<Link to={'/menu'}> */}
                        <img width={28} height={28} src={require('../../../static/images/menu.svg')}/>
                    {/*</Link>*/}
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
