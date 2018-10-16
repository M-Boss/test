/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image, Icon} from 'semantic-ui-react'
import Slider from "react-slick";
import {H1} from "../../../components/Headers";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from '../Header'
import moment from 'moment'
import config from '../../../services/internal/config/Config';
import Footer from "../Footer";
import _ from 'lodash'
import {t} from '../../../translations'

require('./assets/style.css');

class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {website, theme} = this.props;
        return (
            <div className="template-3" style={{overflow: 'hidden', fontFamily: 'serif', textAlign: 'center', backgroundColor: theme.background}}>
                <Header website={website} theme={theme}
                        icon={require('./assets/burger.png')}
                        themeColor={this.props.theme.primary} websiteId={this.props.websiteId}
                        label={website.bride_first + " & " + website.groom_first}/>

                <img style={{ marginTop: 30, opacity: 0.8}} src={require('./assets/top2.png')}/>

                <div style={{textAlign: 'center', paddingTop: 30}}>
                    <h1 className="cursive" style={{color: theme.foreground, marginBottom: 0}}>{website.events_page_title || t('Events')}</h1>
                    <img style={{}} src={require('./assets/sep2.png')}/>
                    <p style={{
                        marginTop: 0,
                        color: theme.foreground,
                        fontSize: 18
                    }}>{website.events_description}</p>
                </div>

                <div style={{marginTop: 40}}>
                    {website.events &&
                    website.events.map((event, index) => {
                        const color = [theme.primary, '#FFF'][index % 2];
                        const textColor = ['#FFF', theme.primary][index % 2];
                        return (
                            <div style={{marginTop: 20, marginBottom: 48,  backgroundColor: color}}>
                                <img style={{}} src={require('./assets/sep.png')}/>

                                <div style={{textAlign: 'center', marginTop: 20, padding: "10px 20px"}}>
                                    <h1 style={{
                                        paddingLeft: 0,
                                        color: theme.foreground
                                    }}>{event.title}</h1>

                                    <p style={{
                                        color: theme.foreground,
                                        fontSize: '1.5em',
                                        marginTop: 10
                                    }}>
                                        {event.date && moment(event.date, "YYYY-MM-DD").format('Do MMMM YYYY')}
                                    </p>
                                    <p style={{fontSize: '1.5em', color: theme.foreground}}>
                                        {event.start_time + " -- " + event.end_time}
                                    </p>
                                    <div style={{display: 'flex', marginTop: -4}}>
                                        <p style={{
                                            fontSize: '1.25em',
                                            flex: 1,
                                            color: theme.foreground
                                        }}>
                                            {event.manual_address ?
                                                `${event.venue}, ${event.postal_code}  ${event.apartment} ${event.street} ${event.city} ${event.country}`
                                                : event.venue}
                                        </p>
                                    </div>
                                    <br/>
                                    {!event.manual_address &&
                                    <a target="_blank"
                                       href={`https://www.google.com/maps/?q=${_.get(event, "location.lat")},${_.get(event, "location.lng")}`}>
                                        <div style={{ padding: 8, border: '1px solid black', color: 'black' }} fluid primary>See on map</div></a>}
                                    <br/>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>

                <Footer theme={theme}/>
            </div>
        )
    }
}

export default connect(state => {
    return {
        user: state.user
    }
})(Events);