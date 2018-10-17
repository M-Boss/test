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
            <div className="template-5" style={{overflow: 'hidden'}}>
                <Header theme={theme} website={website} themeColor={this.props.theme.primary}
                        websiteId={this.props.websiteId}
                        label={website.bride_first + " & " + website.groom_first}/>

                <div style={{position: 'relative'}}>
                    <div style={{
                        backgroundImage: `url(${background})`,
                        width: '100%', height: 285,
                        backgroundSize: 'cover'
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

                <div style={{
                    textAlign: 'center', backgroundColor: theme.background,
                    padding: 56, paddingBottom: 30, paddingLeft: 10, paddingRight: 10,
                    position: 'relative',
                }}>
                    <img width={90} style={{position: 'absolute', right: 0, top: 20}} src={require('./assets/right.png')}/>
                    <img width={80} style={{position: 'absolute', left: 0, bottom: -70}} src={require('./assets/left.png')}/>
                    <h1 className="" style={{color: theme.foreground}}>{website.groom_first + " " + website.groom_last}</h1>

                    <p style={{margin: 0, marginTop: 20, marginBottom: 16, fontSize: 14}}>And</p>
                    <h1 className="" style={{
                        color: theme.foreground,
                        marginTop: 10
                    }}>{website.bride_first + " " + website.bride_last}</h1>
                </div>

                {website.show_parents &&
                <React.Fragment>
                    <div style={{
                        textAlign: 'center',
                        backgroundColor: theme.background,
                        marginTop: 32
                    }}>
                        <div style={{padding: 24, paddingTop: 40}}>
                            <h3 style={{fontSize: 13, color: 'rgba(0,0,0, 0.3)'}}>Son Of</h3>
                            <h2 style={{
                                color: theme.foreground,
                                marginTop: -14
                            }}>{website.groom_father + " & " + website.groom_mother}</h2>
                            <h3 style={{fontSize: 13, color: 'rgba(0,0,0, 0.3)'}}>Daughter Of</h3>
                            <h2 style={{
                                color: theme.foreground,
                                marginTop: -14
                            }}>{website.bride_father + " & " + website.bride_mother}</h2>
                        </div>
                    </div>
                </React.Fragment>}

                {website.date &&
                <div style={{
                    backgroundColor: theme.background,
                    textAlign: 'center',
                    position: 'relative',
                    padding: 24,
                    paddingTop: 10,
                    paddingBottom: 48,
                    marginTop: 80
                }}>
                    <h4 style={{fontFamily: 'sans-serif', fontWeight: 400, fontSize: 16, color: theme.foreground, marginTop: 0, marginBottom: 10}}>
                        #{website.hashtag}</h4>
                    <h3 style={{fontSize: 14, color: 'rgba(0,0,0,0.3)'}}>On</h3>
                    <h2 style={{
                        color: theme.foreground,
                        marginTop: 0,
                        opacity: 0.8
                    }}>{moment(website.date, "YYYY-MM-DD").format('Do MMMM, YYYY')}</h2>

                    <h3 style={{fontSize: 14, color: 'rgba(0,0,0,0.3)'}}>In</h3>
                    <h2 style={{
                        fontFamily: 'serif',
                        color: theme.foreground,
                        marginTop: -10,
                        opacity: 0.8
                    }}>{website.city} {website.country}</h2>
                </div>}

                <div style={{ position: 'relative', backgroundColor: theme.background, textAlign: 'center', marginTop: 100,  padding: 24, paddingTop: 0, paddingBottom: 0}}>
                    <img width={90} style={{position: 'absolute', right: 0, top: 40}} src={require('./assets/right2.png')}/>
                    {website.stories && website.stories.map((story, i) => {
                        return (<div style={{
                            paddingBottom: 24,
                            marginTop: 40
                        }}>
                            <h1 style={{color: theme.foreground, marginTop: 10}}>{website.stories[i].title}</h1>
                            <p style={{
                                color: theme.foreground,
                                marginTop: -10
                            }}>{moment(website.stories[i].date, "YYYY-MM-DD").format('MM. DD. YY')}</p>
                            <p style={{
                                fontFamily: 'Georgia, serif',
                                paddingTop: 4,
                                color: theme.foreground,
                                textAlign: 'center'
                            }}>{website.stories[i].description}</p>
                        </div>)
                    })}
                </div>

                <div style={{marginTop: 32, borderBottom: '2px solid', borderColor: theme.primary}}>
                    <img width={128} style={{marginBottom: -6}} src={require('./assets/bottom.png')}/>
                </div>

                <div style={{ borderBottom: '3px solid', borderColor: theme.foreground, paddingBottom: 0}}>
                    <div style={{
                        backgroundImage: `url(${bottom})`,
                        width: '100%', height: 250,
                        backgroundSize: 'cover'
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