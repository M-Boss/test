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
import {t} from '../../../translations'
require('./assets/style.css');

class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {website, theme} = this.props;
        return (
            <div className="screen-container fixed-header template-5" style={{ backgroundColor: theme.background, overflow: 'hidden', fontFamily: 'sans-serif'}}>
                <Header website={website} theme={theme}
                        themeColor={this.props.theme.primary} websiteId={this.props.websiteId}
                        label={website.bride_first + " & " + website.groom_first}/>

                <div style={{ position: 'relative', opacity: 0.6}}>
                    <img width={60} style={{ left: 0, top: 0}} src={require('./assets/left.png')}/>
                </div>

                <div style={{ position: 'relative', marginTop: -130, borderBottom: '3px solid', borderColor: theme.foreground, textAlign: 'center', paddingTop: 30 }}>
                    <h1 style={{ color: theme.foreground}}>{website.photos_page_title || t('Photos')}</h1>
                    <h2 style={{marginTop: 0, color: theme.foreground, fontSize: 18 }}>{website.photos_description}</h2>
                    {website.photos &&
                    website.photos.map( photo => {
                        return (
                            <img style={{width: '100%', marginTop: 30}} src={config("app.assets") + photo} />
                        )
                    })}
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