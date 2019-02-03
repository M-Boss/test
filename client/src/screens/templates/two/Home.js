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
require('./assets/style.css');

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {website, theme} = this.props;
        const background = website.template_main ? config("app.assets") + website.template_main : require('../shared_assets/logo.png');
        const bottom = website.template_bottom ? config("app.assets") + website.template_bottom : require('../shared_assets/logo.png');

        return (
            <div className="template-2 screen-container fixed-header" style={{overflow: 'hidden'}}>
                <Header website={website} themeColor={this.props.theme.primary}
                        websiteId={this.props.websiteId}
                        label={website.bride_first + " & " + website.groom_first}/>

                <img style={{ position: 'relative', width: '100%', zIndex: 4}} src={require('./assets/down' + theme.index + '.png')}/>
                <div style={{position: 'relative'}}>
                    <div className="template-main-image" style={{
                        backgroundImage: `url(${background})`,
                        width: '100%',
                        backgroundSize: 'cover',
                        backgroundPosition: '50% 50%',
                        backgroundRepeat: 'no-repeat'
                    }}></div>
                    <h2 style={{
                        textAlign: 'center',
                        width: '100%',
                        position: 'absolute',
                        bottom: 45,
                        color: 'white',
                        textShadow: '1px 1px #777'
                    }}>We're getting married!</h2>
                </div>

                <div style={{padding: 56, paddingLeft: 24, paddingRight: 10}}>
                    <h1 style={{color: theme.primary}}>{website.groom_first + " " + website.groom_last}</h1>
                    <p style={{color: theme.primary}}>and</p>
                    <h1 style={{
                        color: theme.primary,
                        marginTop: 10
                    }}>{website.bride_first + " " + website.bride_last}</h1>
                </div>

                {website.show_parents &&
                <React.Fragment>
                    <div style={{
                        backgroundColor: theme.background,
                        marginTop: 48, marginBottom: 48
                    }}>
                        <img style={{marginTop: -48, width: '100%'}}
                             src={require('./assets/top' + theme.index + '.png')}/>
                        <div style={{padding: 24, paddingTop: 0}}>
                            <h3 style={{color: 'rgba(0,0,0, 0.3)'}}>SON OF</h3>
                            <h2 style={{
                                color: '#FFF',
                                marginTop: 10
                            }}>{website.groom_father + " & " + website.groom_mother}</h2>
                            <br/>
                            <br/>
                            <h3 style={{color: 'rgba(0,0,0, 0.3)'}}>DAUGHTER OF</h3>
                            <h2 style={{
                                color: '#FFF',
                                marginTop: 10
                            }}>{website.bride_father + " & " + website.bride_mother}</h2>
                        </div>
                        <img style={{marginBottom: -48, width: '100%'}}
                             src={require('./assets/top' + theme.index + '.png')}/>
                    </div>
                </React.Fragment>}

                {website.date &&
                <div style={{position: 'relative', padding: 24, paddingTop: 40, paddingBottom: 48}}>
                    <h3 style={{fontSize: 14, color: theme.primary}}>ON</h3>
                    <h2 style={{
                        color: theme.primary,
                        marginTop: 10,
                        opacity: 0.8
                    }}>{moment(website.date, "YYYY-MM-DD").format('Do MMMM, YYYY')}</h2>
                    <h5 style={{color: theme.primary, marginTop: 50, marginBottom: 50}}>#{website.hashtag}</h5>
                    <h3 style={{fontSize: 14, color: theme.primary}}>IN</h3>
                    <h2 style={{
                        color: theme.primary,
                        marginTop: 10,
                        opacity: 0.8
                    }}>{website.city} {website.country}</h2>
                </div>}

                <div style={{
                    backgroundColor: theme.primary,
                    marginTop: 36,
                    marginBottom: 48
                }}>
                    <img style={{marginTop: -48, width: '100%'}}
                         src={require('./assets/top' + theme.index + '.png')}/>
                {website.stories && website.stories.map((story, i) => {
                    return (
                        <div style={{padding: 24, paddingTop: 0, paddingBottom: 0}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <h1 style={{color: 'rgba(0,0,0,0.4)'}}>{website.stories[i].title}</h1>
                                <p style={{
                                    color: 'rgba(0,0,0,0.4)',
                                    flex: 1,
                                    textAlign: 'right'
                                }}>{moment(website.stories[i].date, "YYYY-MM-DD").format('MM. DD. YYYY')}</p>
                            </div>
                            <p style={{
                                fontFamily: 'Georgia, serif',
                                paddingTop: 0,
                                paddingBottom: 30,
                                color: '#FFF',
                                textAlign: 'left'
                            }}>{website.stories[i].description}</p>
                        </div>
                    )
                })}
                    <img style={{marginBottom: -48, width: '100%'}}
                         src={require('./assets/top' + theme.index + '.png')}/>
                </div>

                <div style={{textAlign: 'center', paddingTop: 80, paddingBottom: 50}}>
                    <h1 style={{color: theme.primary}}>{(website.groom_first || " ")[0].toUpperCase()}. {(website.groom_last || " ")[0].toUpperCase()}</h1>
                    <div style={{
                        display: 'inline-block',
                        width: 30,
                        height: 2,
                        backgroundColor: theme.primary,
                        opacity: 0.7
                    }}/>
                    <h1 style={{color: theme.primary}}>{(website.bride_first || " ")[0].toUpperCase()}. {(website.bride_last || " ")[0].toUpperCase()}</h1>
                </div>

                <div style={{paddingBottom: 0}}>
                    <div className="template-bottom-image" style={{
                        backgroundImage: `url(${bottom})`,
                        width: '100%',
                        backgroundSize: 'cover',
                        backgroundPosition: '50% 50%',
                        backgroundRepeat: 'no-repeat'
                    }}/>
                </div>
                <Footer theme={theme}/>
            </div>
        );
    }
}


export default connect(state => {
    return {
        user: state.user
    }
})(Home);