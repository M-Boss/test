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


class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const website = this.props.website;
        return (
            <div style={{overflow: 'hidden', fontFamily: 'serif'}}>
                <Header websiteId={this.props.websiteId} label={website.bride_first + " & " + website.groom_first}/>

                <div style={{textAlign: 'center', paddingTop: 30}}>
                    <h1 style={{fontFamily: 'sans-serif', color: '#6c86a1'}}>Events</h1>
                    <p style={{marginTop: 0, color: '#f7bbc2', fontSize: 18, fontFamily: 'sans-serif'}}>
                        Here's what to expect during our wedding weekend.
                        There will also be a printout of this schedule available in your hotel rooms.
                        We can't wait to celebrate with you!
                    </p>
                    <img style={{marginTop: 10, width: '60%'}} src={require('./assets/photos-flower.png')}/>
                </div>

                <div style={{marginTop: 100}}>
                    {website.events &&
                    [...website.events, ...website.events].map((event, index) => {
                        const color = ['#f1f4f8', '#FFF'][index % 2];
                        return (
                            <div style={{marginTop: -70}}>
                                <div>
                                    <div style={{
                                        height: 100,
                                        width: '150%',
                                        marginLeft: -20,
                                        transform: 'rotate(-15deg)',
                                        backgroundColor: color
                                    }}> </div>
                                </div>
                                {index !== 0 && <div>
                                    <img style={{width: 160, marginTop: -200, transform: 'rotate(-0deg)'}} align="right"
                                         src={require('./assets/events.png')}/>
                                </div>}

                                <div style={{marginTop: -30, padding: "50px 20px 130px", transform: 'rotate(-0deg)', backgroundColor: color}}>
                                    <h1 style={{paddingLeft: 0, color: '#6c86a1', fontFamily: 'serif'}}>{event.title}</h1>

                                    <p style={{fontSize: '1.25em', marginTop: 50, color: '#6c86a1', fontFamily: 'sans-serif'}}>
                                        <Icon style={{color: "#edadbd"}} name="calendar"/>
                                        {event.date && moment(event.date, "YYYY-MM-DD").format('Do MMMM YYYY')}
                                    </p>
                                    <p style={{fontSize: '1.25em',  color: '#6c86a1', fontFamily: 'sans-serif'}}>
                                        <Icon style={{color: "#edadbd"}} name="clock"/>
                                        {event.start_time + " -- " + event.end_time}
                                    </p>
                                    <div style={{display: 'flex', marginTop: -4}}>
                                        <Icon style={{fontSize: '1.25em', color: "#edadbd"}} name="point"/>
                                        <p style={{fontSize: '1.25em', flex: 1,  color: '#6c86a1', fontFamily: 'sans-serif'}}>
                                            {event.manual_address ?
                                                `${event.venue}, ${event.postal_code}  ${event.apartment} ${event.street} ${event.city} ${event.country}`
                                                : event.venue}
                                        </p>
                                    </div>
                                    <br/>
                                    <Button fluid primary>See on map</Button>
                                    <br/>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>

                <Footer/>
            </div>
        )
    }
}

export default connect(state => {
    return {
        user: state.user
    }
})(Events);