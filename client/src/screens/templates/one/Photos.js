/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image} from 'semantic-ui-react'
import Slider from "react-slick";
// import Footer from "./Footer";
import {H1} from "../../../components/Headers";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from './Header'
import moment from 'moment'
import config from '../../../services/internal/config/Config';


class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {website, theme} = this.props;
        return (
            <div style={{overflow: 'hidden', fontFamily: 'serif'}}>

                <Header themeColor={this.props.theme.primary} websiteId={this.props.websiteId} label={website.bride_first + " & " + website.groom_first}/>
                <div style={{ textAlign: 'center', paddingTop: 30 }}>
                    <h1 style={{fontFamily: 'serif', color: theme.primary}}>Photos</h1>
                    <h2 style={{marginTop: 0, color: theme.secondary, fontSize: 18, fontFamily: 'serif' }}>A few snaps taken of us <br/> over the years...</h2>
                    <img style={{marginTop: 10, width: 160}} src={require('./assets/photos-flower.png')} />

                    {website.photos &&
                    website.photos.map( photo => {
                        return (
                            <img style={{width: '100%', marginTop: 30}} src={config("app.assets") + photo} />
                        )
                    })
                    }

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 12,
                        paddingBottom: 15,
                        backgroundColor: '#f3f5f8'
                    }}>
                        <h5 style={{color: theme.primary, margin: 0, marginRight: 10}}>With love by</h5>
                        <img style={{height: 24}} src={require('./assets/logo.png')}/>
                        <h6 style={{color: theme.primary, margin: 0, flex: 1, textAlign: 'right', textDecoration: 'underline'}}>
                            <Link to='/'>
                            About
                            </Link>
                        </h6>
                    </div>

                    <div style={{backgroundColor: theme.primary, color: '#FFF', padding: 12}}>
                        Copyright © Nikahku 2018
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        user: state.user
    }
})(Photos);