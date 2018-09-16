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
import Header from './Header'
import Footer from './Footer'
import moment from 'moment'
import config from '../../../services/internal/config/Config';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {website, theme} = this.props;

        const background = website.template_main ? config("app.assets") + website.template_main : require('./assets/bg-1.png');
        const bottom = website.template_bottom ? config("app.assets") + website.template_bottom : require('./assets/footer-01.png');

        return (
            <div style={{overflow: 'hidden'}}>
                <Header themeColor={this.props.theme.primary}
                        websiteId={this.props.websiteId}
                        label={website.bride_first + " & " + website.groom_first}/>

                <div style={{position: 'relative'}}>
                    <div style={{
                        backgroundImage: `url(${background})`,
                        width: '100%', height: 300,
                        backgroundSize: 'cover'
                    }}></div>
                    <em><h1 style={{
                        textAlign: 'center',
                        width: '100%',
                        position: 'absolute',
                        top: 45,
                        color: 'white',
                        textShadow: '1px 1px #777'
                    }}>We're <br/> getting married!</h1></em>
                    <img style={{marginTop: -30}} src={require('./assets/flower-top.png')}/>
                </div>
                <div style={{position: 'relative', paddingBottom: 130}}>
                    <em style={{textAlign: 'center'}}>
                        <h1>{website.groom_first + " " + website.groom_last}</h1>
                        <h1>{website.bride_first + " " + website.bride_last}</h1>
                    </em>
                    <img style={{
                        position: 'absolute',
                        top: 40,
                        left: '50%',
                        marginLeft: -80,
                        width: 160,
                        height: 160,
                        marginTop: -80
                    }} src={require('./assets/center.png')}/>
                </div>

                {website.show_parents &&
                <React.Fragment>
                    <div>
                        <div style={{
                            height: 100,
                            width: '150%',
                            marginLeft: -20,
                            transform: 'rotate(-15deg)',
                            backgroundColor: theme.background
                        }}></div>
                    </div>
                    <div>
                        <img style={{marginTop: -250, transform: 'rotate(-0deg)'}} align="right"
                             src={require('./assets/flower-bottom.png')}/>
                        <div style={{clear: 'both'}}></div>
                    </div>

                    <div style={{
                        marginTop: -30,
                        marginBottom: -70,
                        paddingTop: 60,
                        paddingBottom: 80,
                        backgroundColor: theme.background,
                        textAlign: 'center'
                    }}>
                        <h3 style={{color: theme.secondary}}>SON OF</h3>
                        <h2>{website.groom_father + " & " + website.groom_mother}</h2>
                        <br/>
                        <br/>
                        <h3 style={{color: theme.secondary}}>DAUGHTER OF</h3>
                        <h2>{website.bride_father + " & " + website.bride_mother}</h2>
                    </div>

                    <div>
                        <div style={{
                            height: 100,
                            width: '150%',
                            marginLeft: -20,
                            transform: 'rotate(-15deg)',
                            backgroundColor: theme.background
                        }}></div>
                    </div>
                </React.Fragment>}

                <div>
                    <img style={{marginTop: -10, transform: 'rotate(-0deg)'}} src={require('./assets/flower-top.png')}/>
                    <div style={{clear: 'both'}}></div>
                </div>

                {website.date &&
                <div style={{textAlign: 'center', position: 'relative', marginTop: -50, paddingBottom: 130}}>
                    <h3 style={{color: theme.secondary}}>ON</h3>
                    <H2>{moment(website.date, "YYYY-MM-DD").format('Do MMMM')}</H2>
                    <H2 style={{
                        color: theme.primary,
                        fontWeight: '400'
                    }}>{moment(website.date, "YYYY-MM-DD").format('YYYY')}</H2>
                    <h5 style={{color: theme.primary, marginTop: 50, marginBottom: 50}}>#{website.hashtag}</h5>
                    <h3 style={{color: theme.secondary}}>IN</h3>
                    <H2>{website.city}</H2>
                    <H2 style={{color: theme.primary, fontWeight: '400'}}>{website.country}</H2>
                </div>}


                <div>
                    <div style={{
                        height: 100,
                        width: '150%',
                        marginLeft: -20,
                        transform: 'rotate(-15deg)',
                        backgroundColor: theme.background
                    }}></div>
                </div>
                <div>
                    <img style={{marginTop: -250, transform: 'rotate(-0deg)'}} align="right"
                         src={require('./assets/flower-bottom.png')}/>
                    <div style={{clear: 'both'}}></div>
                </div>

                {website.stories && website.stories.length > 0 &&
                <div style={{
                    marginTop: -30,
                    marginBottom: -70,
                    paddingTop: 60,
                    paddingBottom: 80,
                    backgroundColor: theme.background,
                    textAlign: 'center'
                }}>
                    <h1 style={{color: theme.primary}}>Our Story</h1>
                    <h5 style={{
                        color: theme.secondary,
                        marginTop: 0
                    }}>{moment(website.stories[0].date, "YYYY-MM-DD").format('MM. DD. YYYY')}</h5>
                    <p style={{
                        fontFamily: 'Georgia, serif',
                        padding: 20,
                        color: theme.primary,
                        textAlign: 'left'
                    }}>{website.stories[0].description}</p>
                </div>}

                <div>
                    <div style={{
                        height: 100,
                        width: '150%',
                        marginLeft: -20,
                        transform: 'rotate(-15deg)',
                        backgroundColor: theme.background
                    }}></div>
                </div>

                <div style={{textAlign: 'center', paddingTop: 80, paddingBottom: 50}}>
                    <h1>{(website.groom_first || " ")[0].toUpperCase()} <img width={28}
                                                                             src={require('./assets/and.png')}/> {(website.bride_first || " ")[0].toUpperCase()}
                    </h1>
                    <img style={{width: 160}} src={require('./assets/footer-under-names.png')}/>
                </div>

                <div style={{paddingBottom: 0}}>
                    <div style={{
                        backgroundImage: `url(${bottom})`,
                        width: '100%', height: 250,
                        backgroundSize: 'cover'
                    }}></div>
                </div>
                <Footer theme={theme}/>
            </div>
        );

        function H2({children, style}) {
            return <h2 style={{color: theme.primary, marginTop: -10, ...style}}>{children}</h2>
        }
    }
}


export default connect(state => {
    return {
        user: state.user
    }
})(Home);