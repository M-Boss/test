/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image, Icon} from 'semantic-ui-react'
import Slider from "react-slick";
import {H1} from "../../../components/Headers";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from './Header'
import moment from 'moment'
import config from '../../../services/internal/config/Config';
import Footer from "../Footer";
import _ from 'lodash'

class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {website, theme} = this.props;
        return (
            <div style={{overflow: 'hidden', fontFamily: 'serif'}}>
                <Header website={website} themeColor={this.props.theme.primary} websiteId={this.props.websiteId}
                        label={website.bride_first + " & " + website.groom_first}/>

                <div style={{textAlign: 'center', paddingTop: 30}}>
                    <h1 style={{fontFamily: 'sans-serif', color: theme.primary}}>Events</h1>
                    <p style={{
                        marginTop: 0,
                        color: theme.primary,
                        fontSize: 18,
                        fontFamily: 'sans-serif'
                    }}>{website.events_description}</p>
                </div>

                <div style={{marginTop: 100}}>
                    {website.events &&
                    website.events.map((event, index) => {
                        const color = [theme.primary, '#FFF'][index % 2];
                        const textColor = ['#FFF', theme.primary][index % 2];
                        return (
                            <div style={{marginTop: 70, marginBottom: 48,  backgroundColor: color}}>
                                {index % 2 === 0 &&
                                <img style={{marginTop: -32, width: '100%'}} src={require('./assets/top.png')}/>}
                                <div style={{textAlign: 'center', padding: "0 20px"}}>
                                    <h1 style={{
                                        paddingLeft: 0,
                                        color: 'rgba(0,0,0,0.5)',
                                        fontFamily: 'serif'
                                    }}>{event.title}</h1>

                                    <p style={{
                                        color: textColor,
                                        fontSize: '1.25em',
                                        marginTop: 50,
                                        fontFamily: 'sans-serif'
                                    }}>
                                        {event.date && moment(event.date, "YYYY-MM-DD").format('Do MMMM YYYY')}
                                    </p>
                                    <p style={{fontSize: '1.25em', color: textColor, fontFamily: 'sans-serif'}}>
                                        {event.start_time + " -- " + event.end_time}
                                    </p>
                                    <div style={{display: 'flex', marginTop: -4}}>
                                        <p style={{
                                            fontSize: '1.25em',
                                            flex: 1,
                                            color: textColor,
                                            fontFamily: 'sans-serif'
                                        }}>
                                            {event.manual_address ?
                                                `${event.venue}, ${event.postal_code}  ${event.apartment} ${event.street} ${event.city} ${event.country}`
                                                : event.venue}
                                        </p>
                                    </div>
                                    <br/>
                                    {!event.manual_address &&
                                    <a target="_blank"
                                       href={`https://www.google.com/maps/?q=${_.get(event, "location.lat")},${_.get(event, "location.lng")}`}><Button
                                        fluid primary>See on map</Button></a>}
                                    <br/>
                                </div>
                                {index % 2 === 0 &&
                                <img style={{marginBottom: -48, width: '100%'}} src={require('./assets/top.png')}/>}
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