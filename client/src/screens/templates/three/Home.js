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
            <div className="template-3" style={{overflow: 'hidden'}}>
                <Header theme={theme} website={website} themeColor={this.props.theme.primary}
                        icon={require('./assets/burger.png')}
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
                    }}>WE'RE GETTING MARRIED!</h2>
                </div>

                <div style={{
                    textAlign: 'center', backgroundColor: theme.background,
                    padding: 56, paddingBottom: 30, paddingLeft: 10, paddingRight: 10
                }}>
                    <img style={{marginBottom: 10}} src={require('./assets/top.png')}/>
                    <h1 className="cursive"
                        style={{color: theme.foreground}}>{website.groom_first + " " + website.groom_last}</h1>

                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{flex: 1}}/>
                        <div style={{marginRight: 8, height: 1, width: 40, backgroundColor: 'rgba(0,0,0,0.3)'}}/>
                        <p style={{margin: 0, fontSize: 14, color: 'rgba(0,0,0,0.4)'}}>AND</p>
                        <div style={{marginLeft: 8, height: 1, width: 40, backgroundColor: 'rgba(0,0,0,0.3)'}}/>
                        <div style={{flex: 1}}/>
                    </div>
                    <h1 className="cursive" style={{
                        color: theme.foreground,
                        marginTop: 10
                    }}>{website.bride_first + " " + website.bride_last}</h1>
                </div>

                {website.show_parents &&
                <React.Fragment>
                    <div style={{
                        textAlign: 'center',
                        backgroundColor: theme.background,
                    }}>
                        <img src={require('./assets/sep.png')}/>
                        <div style={{padding: 24, paddingTop: 40}}>
                            <h3 style={{fontSize: 13, color: 'rgba(0,0,0, 0.3)'}}>SON OF</h3>
                            <h2 style={{
                                color: theme.foreground,
                                marginTop: -14
                            }}>{website.groom_father + " & " + website.groom_mother}</h2>
                            <h3 style={{fontSize: 13, color: 'rgba(0,0,0, 0.3)'}}>DAUGHTER OF</h3>
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
                    paddingBottom: 48
                }}>
                    <img src={require('./assets/sep.png')}/>
                    <h3 style={{fontSize: 14, color: 'rgba(0,0,0,0.3)'}}>ON</h3>
                    <h2 style={{
                        color: theme.foreground,
                        marginTop: 0,
                        opacity: 0.8
                    }}>{moment(website.date, "YYYY-MM-DD").format('Do MMMM, YYYY')}</h2>
                    <h5 style={{fontSize: 16, color: theme.foreground, marginTop: 0, marginBottom: 10}}>
                        #{website.hashtag}</h5>
                    <h3 style={{fontSize: 14, color: 'rgba(0,0,0,0.3)'}}>IN</h3>
                    <h2 style={{
                        color: theme.foreground,
                        marginTop: -10,
                        opacity: 0.8
                    }}>{website.city} {website.country}</h2>
                </div>}

                <div style={{ backgroundColor: theme.background, textAlign: 'center', padding: 24, paddingTop: 0, paddingBottom: 0}}>
                    <img src={require('./assets/sep.png')}/>
                    {website.stories && website.stories.map((story, i) => {
                        return (<div style={{
                            paddingBottom: 24
                        }}>
                            <h1 style={{color: theme.foreground, marginTop: 10}}>{website.stories[i].title}</h1>
                            <p style={{
                                color: theme.foreground,
                                marginTop: -10
                            }}>{moment(website.stories[i].date, "YYYY-MM-DD").format('MM. DD. YYYY')}</p>
                            <p style={{
                                fontFamily: 'Georgia, serif',
                                paddingTop: 4,
                                color: theme.foreground,
                                textAlign: 'center'
                            }}>{website.stories[i].description}</p>
                        </div>)
                    })}
                </div>

                <div style={{
                    position: 'relative', backgroundColor: theme.background, textAlign: 'center',
                    paddingTop: 50, paddingBottom: 100
                }}>
                    <img style={{width: 160, position: 'absolute', left: '50%', top: 14, marginLeft: -80}}
                         src={require('./assets/crown.png')}/>
                    <h1 className="cursive" style={{
                        fontSize: 28,
                        color: 'rgba(0,0,0,0.65)'
                    }}>{(website.bride_first || " ")[0].toUpperCase()}
                        & {(website.groom_first || " ")[0].toUpperCase()}</h1>
                </div>

                <div style={{paddingBottom: 0}}>
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