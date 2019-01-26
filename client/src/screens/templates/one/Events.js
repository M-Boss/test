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
class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {website, theme} = this.props;
        return (
            <div className="screen-container fixed-header" style={{overflow: 'hidden', fontFamily: 'serif'}}>
                <Header website={website} themeColor={this.props.theme.primary} websiteId={this.props.websiteId}
                        label={website.bride_first + " & " + website.groom_first}/>

                <div style={{textAlign: 'center', paddingTop: 30}}>
                    <h1 style={{
                        fontFamily: 'sans-serif',
                        color: theme.primary
                    }}>{website.events_page_title || t('Events')}</h1>
                    <p style={{
                        marginTop: 0,
                        color: theme.secondary,
                        fontSize: 18,
                        fontFamily: 'sans-serif'
                    }}>{website.events_description}</p>
                    <img style={{marginTop: 10, width: '60%'}} src={require('./assets/photos-flower.png')}/>
                </div>

                <div style={{marginTop: 100}}>
                    {website.events &&
                    website.events.map((event, index) => {
                        const color = [theme.background, '#FFF'][index % 2];
                        return (
                            <div style={{marginTop: -70}}>
                                <div>
                                    <div style={{
                                        height: 100,
                                        width: '150%',
                                        marginLeft: -20,
                                        transform: 'rotate(-15deg)',
                                        backgroundColor: color
                                    }}></div>
                                </div>
                                {index !== 0 && <div>
                                    <img style={{width: 160, marginTop: -200, transform: 'rotate(-0deg)'}} align="right"
                                         src={require('./assets/events.png')}/>
                                </div>}

                                <div style={{
                                    marginTop: -30,
                                    padding: "50px 20px 130px",
                                    transform: 'rotate(-0deg)',
                                    backgroundColor: color
                                }}>
                                    <h1 style={{
                                        paddingLeft: 0,
                                        color: theme.primary,
                                        fontFamily: 'serif'
                                    }}>{event.title}</h1>

                                    <p style={{
                                        fontSize: '1.25em',
                                        marginTop: 50,
                                        color: theme.primary,
                                        fontFamily: 'sans-serif'
                                    }}>
                                        <Icon style={{color: theme.secondary}} name="calendar"/>
                                        {event.date && moment(event.date, "YYYY-MM-DD").format('Do MMMM YYYY')}
                                    </p>
                                    <p style={{fontSize: '1.25em', color: theme.primary, fontFamily: 'sans-serif'}}>
                                        <Icon style={{color: theme.secondary}} name="clock"/>
                                        {event.start_time + " -- " + event.end_time}
                                    </p>
                                    <div style={{display: 'flex', marginTop: -4}}>
                                        <Icon style={{fontSize: '1.25em', color: theme.secondary}} name="point"/>
                                        <p style={{
                                            fontSize: '1.25em',
                                            flex: 1,
                                            color: theme.primary,
                                            fontFamily: 'sans-serif'
                                        }}>
                                            {event.manual_address ?
                                                `${event.venue}, ${event.postal_code}  ${event.apartment} ${event.street} ${event.city} ${event.country}`
                                                : event.venue}
                                        </p>
                                    </div>
                                    <div style={{paddingTop: 24}}>
                                        <p style={{
                                            fontSize: '1.25em',
                                            color: theme.primary
                                        }}>{event.description}</p>
                                    </div>
                                    <br/>
                                    {!event.manual_address &&
                                    <a target="_blank"
                                       href={`https://www.google.com/maps/?q=${_.get(event, "location.lat")},${_.get(event, "location.lng")}`}><Button
                                        fluid primary>See on map</Button></a>}
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