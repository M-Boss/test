/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image} from 'semantic-ui-react'
import Slider from "react-slick";
import Footer from "./Footer";
import Header from "./Header";
import {H1, H2} from "../components/Headers";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {t} from '../translations'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import _ from 'lodash'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        // Task #184 Gitlab
        const hash = _.get(this.props, 'location.hash', '');
        if(this.props.user.token && !hash.includes('source=header')){
            this.props.history.push('/services')
        }
    }

    render() {
        return <React.Fragment>
            <Header />

            {/*<MessengerCustomerChat
                pageId="394725757753593"
                appId="2365731387002380"
                htmlRef="fb_ref"
            />*/}

            {/*<H1>Hey there 01</H1>*/}
            <div style={{textAlign: 'center'}}>
                <section style={{paddingTop: 32, paddingLeft: 32, paddingRight: 32, backgroundColor: '#EFFDFF'}}>
                    <img width={280} src={require('../static/images/home-01.png')} alt="nikahku"/>
                    <H1>{t("Create a free website for your wedding")}</H1>

                    <H2 style={{color: '#3d434e'}}>{t("With easy to use templates and features to make your wedding planning that much easier")}</H2>

                    {!this.props.user.token &&
                    <Link to='/login'><Button style={{marginTop: 20, marginBottom: 32}}
                                              primary>{t("Register For Free")}</Button></Link>}

                    {!!this.props.user.token &&
                    <Link to='/create'><Button style={{marginTop: 20, marginBottom: 32}}
                                               primary>{t("To Your Website")}</Button></Link>}

                </section>

                <section style={{paddingTop: 48, paddingLeft: 32, paddingRight: 32,}}>
                    <h2 style={{fontSize: 26}}>{t("Templates")}</h2>
                    <p style={{fontSize: 18}}>{t("100+ Easy to Use templates to match your specific needs")}</p>

                    {this.renderCarousel()}

                    {!this.props.user.token &&
                    <Link to='/login'><Button style={{marginTop: 20, marginBottom: 32}}
                                              primary>{t("Choose your template")}</Button></Link>}


                    {!!this.props.user.token &&
                    <Link to='/create'><Button style={{marginTop: 20, marginBottom: 32}}
                                               primary>{t("Choose your template")}</Button></Link>}


                </section>

                <section style={{
                    backgroundColor: '#F4F7F9',
                    paddingBottom: 50,
                    paddingTop: 48,
                    paddingLeft: 32,
                    paddingRight: 32,
                }}>
                    <h2 style={{fontSize: 26}}>{t("Its as easy as 1,2,3!")}</h2>
                    <div style={{
                        maxWidth: 400,
                        margin: 'auto'
                    }}>
                        {this.renderSteps()}
                    </div>
                </section>

                <section style={{paddingTop: 32, paddingLeft: 32, paddingRight: 32}}>
                    <img width={280} src={require('../static/images/home-04.svg')} alt="nikahku"/>
                    <h1 style={{fontSize: 32}}>Inviting multinational guests?</h1>

                    <p>Get the freedom to publish your site
                        in any language. Be even closer to your
                        loved ones.</p>

                    <a href="https://www.nikahku.com/wedding/sarah-jason" target="_blank"><Button style={{marginTop: 20, marginBottom: 32}} primary>View English
                        Website</Button></a>
                </section>

                <section style={{paddingTop: 32, paddingLeft: 32, paddingRight: 32, backgroundColor: '#F4F7F9'}}>
                    <img width={280} src={require('../static/images/home-05.svg')} alt="nikahku"/>
                    <h1 style={{fontSize: 32}}>{t("Customize and change your wedding anytime!")}</h1>

                    <p>{t("Change your template whenever you want - we are adding templates all the time Password protect your site or make it unsearchable on google")}</p>

                    <Link to="/create"><Button style={{marginTop: 20, marginBottom: 32}}
                                               primary>{t("Try for free")}</Button></Link>

                </section>

                <section style={{paddingBottom: 40, paddingTop: 32, paddingLeft: 32, paddingRight: 32}}>
                    <img width={280} src={require('../static/images/home-06.svg')} alt="nikahku"/>
                    <h1 style={{fontSize: 32}}>{t("Seamlessly connect your hashtag to your website")}</h1>

                    <p>{t("Add your #hashtag instagram stream to get guests excited, or for you to reminisce after your wedding!")}</p>

                    <Link to="/create"><Button style={{marginTop: 20, marginBottom: 32}}
                                               primary>{t("Get Started")}</Button></Link>
                </section>

                <section className="inverted" style={{
                    backgroundColor: '#21899A',
                    paddingBottom: 60,
                    paddingTop: 32,
                    paddingLeft: 32,
                    paddingRight: 32
                }}>
                    <h1 style={{fontSize: 32}}>{t("Get guests info online")}</h1>

                    <p>{t("No more waiting for paper RSVPs or contacting your guests individually")}</p>

                    <div style={{
                        maxWidth: 400,
                        margin: 'auto'
                    }}>
                        <RSVPRow>{t("Have guests directly RSVP on your wedding website")}</RSVPRow>
                        <RSVPRow>{t("Ask for food preferences, song requests, are they bringing a date?")}</RSVPRow>
                        <RSVPRow>{t("Track every response on our Guest List Manager")}</RSVPRow>
                    </div>
                    <Image style={{margin: 'auto', maxWidth: 400, marginTop: 48}} fluid src={require('../static/images/rsvp.svg')} alt="nikahku"/>
                </section>

                <Footer/>
            </div>
        </React.Fragment>
    }

    renderCarousel() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
        };

        return (
            <div style={{maxWidth: 400, margin: 'auto'}}>
                <Slider {...settings}>
                    <div><img className="slide" style={{margin: '2%', width: '96%'}} src={require('../static/images/home-carousel/template-6.jpg')}/></div>
                    <div><img className="slide" style={{margin: '2%', width: '96%'}} src={require('../static/images/home-carousel/template-8.jpg')}/></div>
                    <div><img className="slide" style={{margin: '2%', width: '96%'}} src={require('../static/images/home-carousel/template-9.jpg')}/></div>
                </Slider>
            </div>
        )
    }

    renderSteps() {
        return (<Fragment>
            <Step step="1" title={t("Choose your template")} body={t("We have over 100+ designs to choose from")}
                  image={require("../static/images/step-01.svg")}/>

            <Step step="2" title={t("Put your personal touches")}
                  body={t("Add wedding details, photos, stories Let guests RSVP too!")}
                  image={require("../static/images/step-02.svg")}/>

            <Step step="3" title={t("Share it with guests")}
                  body={t("Share the link online or print it on your wedding invitations")}
                  image={require("../static/images/step-03.svg")}/>
        </Fragment>)
    }
}

function Step({step, title, body, image}) {
    return (
        <Grid verticalAlign='middle' columns='equal' style={{textAlign: 'left', marginTop: 32}}>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 90}}>
                    <img style={{width: 50}} src={image}/>
                </Grid.Column>
                <Grid.Column>
                    <small style={{color: '#21899A'}}>STEP {step}</small>
                    <h4 style={{fontWeight: 400, fontSize: 21, marginTop: 0}}>{title}</h4>
                    <p>{body}</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

function RSVPRow({children}) {
    return (
        <Grid verticalAlign='middle' columns='equal' style={{textAlign: 'left', marginTop: 8}}>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 60}}>
                    <img width={36} src={require('../static/images/check.svg')}/>
                </Grid.Column>
                <Grid.Column>
                    <p>{children}</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default connect(state => {
    return {
        user: state.user
    }
})(Home)