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
import Header from '../Header'
import Footer from '../Footer'
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
            <div style={{overflow: 'hidden', fontFamily: 'sans-serif'}}>

                <Header website={website} themeColor={this.props.theme.primary} websiteId={this.props.websiteId} label={website.bride_first + " & " + website.groom_first}/>
                <img style={{ width: '100%', opacity: 0.8}} src={require('./assets/top' + theme.index + '.png')}/>
                <div style={{ textAlign: 'center', paddingTop: 30 }}>
                    <h1 style={{fontFamily: 'serif', color: theme.primary}}>Photos</h1>
                    <h2 style={{marginTop: 0, color: theme.primary, fontSize: 18, fontFamily: 'serif' }}>{website.photos_description}</h2>
                    {website.photos &&
                    website.photos.map( photo => {
                        return (
                            <img style={{width: '100%', marginTop: 30}} src={config("app.assets") + photo} />
                        )
                    })
                    }
                    <Footer theme={theme}/>
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