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
            <div className="template-4" style={{overflow: 'hidden', fontFamily: 'serif', textAlign: 'center', backgroundColor: theme.background}}>
                <Header website={website} theme={theme}
                        themeColor={this.props.theme.primary} websiteId={this.props.websiteId}
                        label={website.bride_first + " & " + website.groom_first}/>

                <div style={{textAlign: 'right'}}>
                    <img style={{width: 200}} src={require('./assets/topRight.png')}/>
                </div>

                <div style={{textAlign: 'center', paddingTop: 30}}>
                    <h1 style={{color: theme.foreground, marginBottom: 0}}>{website.events_page_title || t('Events')}</h1>
                    <p style={{
                        marginTop: 0,
                        color: theme.foreground,
                        fontSize: 18,
                        fontFamily: 'serif'
                    }}>{website.events_description}</p>
                </div>

                <div style={{marginTop: 80}}>
                    {website.events &&
                    website.events.map((event, index) => {
                        const color = [theme.primary, '#FFF'][index % 2];
                        const textColor = ['#FFF', theme.primary][index % 2];
                        return (
                            <div style={{marginTop: 20, marginBottom: 48,  backgroundColor: color}}>
                                <div style={{textAlign: 'center', marginTop: 20, padding: "10px 20px"}}>
                                    <h1 style={{
                                        paddingLeft: 0,
                                        color: theme.foreground
                                    }}>{event.title}</h1>

                                    <p style={{
                                        color: theme.foreground,
                                        fontSize: '1.5em',
                                        fontFamily: 'serif',
                                        marginTop: -10
                                    }}>
                                        {event.date && moment(event.date, "YYYY-MM-DD").format('Do MMMM YYYY')}
                                    </p>

                                    <p style={{fontSize: '1.5em', marginTop: -10, fontFamily: 'serif',color: theme.foreground}}>
                                        {event.start_time + " -- " + event.end_time}
                                    </p>
                                    <div style={{display: 'flex', marginTop: -4}}>
                                        <p style={{
                                            fontSize: '1.25em',
                                            flex: 1,
                                            fontFamily: 'serif',
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

                <div style={{marginTop: 32, borderBottom: '2px solid', borderColor: theme.primary}}>
                    <img style={{width: '100%', marginBottom: -6}} src={require('./assets/bottom.png')}/>
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