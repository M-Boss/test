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

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <React.Fragment>
            <Header />
            <div style={{textAlign: 'center'}}>
                <section style={{paddingTop: 32, paddingLeft: 32, paddingRight: 32, backgroundColor: '#EFFDFF'}}>
                    <img width={280} src={require('../static/images/home-01.png')} alt="nikahku"/>
                    <H1>Create a free website for <strong style={{color: '#F3817A'}}>your
                        wedding</strong></H1>

                    <H2 style={{color: '#3d434e'}}>With easy to use templates and
                        features to make your wedding planning that much easier.</H2>

                    {!this.props.user.token &&
                    <Link to='/login'><Button style={{marginTop: 20, marginBottom: 32}} primary>Register For
                        Free</Button></Link>}

                    {!!this.props.user.token &&
                    <Link to='/create'><Button style={{marginTop: 20, marginBottom: 32}} primary>To Your
                        Website</Button></Link>}


                </section>

                <section style={{paddingTop: 48, paddingLeft: 32, paddingRight: 32,}}>
                    <h2 style={{fontSize: 26}}>Templates</h2>
                    <p style={{fontSize: 18}}>100+ Easy to use templates to match
                        your specific needs</p>

                    {this.renderCarousel()}

                    {!this.props.user.token &&
                    <Link to='/login'><Button style={{marginTop: 20, marginBottom: 32}} primary>Choose Your
                        Template</Button></Link>}


                    {!!this.props.user.token &&
                    <Link to='/create'><Button style={{marginTop: 20, marginBottom: 32}} primary>Choose Your
                        Template</Button></Link>}


                </section>

                <section style={{
                    backgroundColor: '#F4F7F9',
                    paddingBottom: 50,
                    paddingTop: 48,
                    paddingLeft: 32,
                    paddingRight: 32,
                }}>
                    <h2 style={{fontSize: 26}}>It's easy as 1, 2, 3!</h2>
                    {this.renderSteps()}
                </section>

                <section style={{paddingTop: 32, paddingLeft: 32, paddingRight: 32}}>
                    <img width={280} src={require('../static/images/home-04.svg')} alt="nikahku"/>
                    <h1 style={{fontSize: 32}}>Inviting multinational guests?</h1>

                    <p>Get the freedom to publish your site
                        in any language. Be even closer to your
                        loved ones.</p>

                    <Link to="/create"><Button style={{marginTop: 20, marginBottom: 32}} primary>View English
                        Website</Button></Link>
                </section>

                <section style={{paddingTop: 32, paddingLeft: 32, paddingRight: 32, backgroundColor: '#F4F7F9'}}>
                    <img width={280} src={require('../static/images/home-05.svg')} alt="nikahku"/>
                    <h1 style={{fontSize: 32}}>Customize and change
                        your website anytime!</h1>

                    <p>Change your template whenever you
                        want - we are adding templates all the time. Password protect your site or make
                        it unsearchable on google.</p>

                    <Link to="/create"><Button style={{marginTop: 20, marginBottom: 32}} primary>Try For
                        Free</Button></Link>

                </section>

                <section style={{paddingBottom: 40, paddingTop: 32, paddingLeft: 32, paddingRight: 32}}>
                    <img width={280} src={require('../static/images/home-06.svg')} alt="nikahku"/>
                    <h1 style={{fontSize: 32}}>Seamlessly connect your hashtag to your website</h1>

                    <p>Add your #hashtag instagram stream
                        to get guests excited, or for you to reminisce
                        after your wedding!</p>

                    <Link to="/create"><Button style={{marginTop: 20, marginBottom: 32}} primary>Get
                        Started</Button></Link>
                </section>

                <section className="inverted" style={{
                    backgroundColor: '#21899A',
                    paddingBottom: 60,
                    paddingTop: 32,
                    paddingLeft: 32,
                    paddingRight: 32
                }}>
                    <h1 style={{fontSize: 32}}>Get guest info online</h1>

                    <p>No more waiting for paper RSVPs
                        or contacting your guests individually</p>

                    <RSVPRow>Have guests directly RSVP on your
                        wedding website</RSVPRow>
                    <RSVPRow>Ask for food preferences, song
                        requests, are they bringing a date?</RSVPRow>
                    <RSVPRow>Track every response on our
                        Guest List Manager.</RSVPRow>

                    <Image style={{marginTop: 48}} fluid src={require('../static/images/rsvp.svg')} alt="nikahku"/>
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
            <Slider {...settings}>

                <img src={require('../static/images/slide-01.jpg')}/>

                <img src={require('../static/images/slide-02.jpg')}/>
                <img src={require('../static/images/slide-03.jpg')}/>
            </Slider>
        )
    }

    renderSteps() {
        return (<Fragment>
            <Step step="1" title="Choose your template" body="We have over 100+ designs
to choose from." image={require("../static/images/step-01.svg")}/>

            <Step step="2" title="Put your personal touches" body="Add wedding details, photos,
stories. Let guests RSVP too!" image={require("../static/images/step-02.svg")}/>

            <Step step="3" title="Share it with guests" body="Share the link online or print
it on your wedding invitations." image={require("../static/images/step-03.svg")}/>
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