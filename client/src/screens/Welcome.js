/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image, Message} from 'semantic-ui-react'
import Slider from "react-slick";
import Footer from "./Footer";
import Header from "./Header";
import {H1} from "../components/Headers";
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {t} from '../translations'

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    accountNotValidated(){
        return this.props.user && this.props.user.id > 62 &&  !this.props.user.active;
    }

    render() {
        return <React.Fragment>
            <Header />

            {this.accountNotValidated() && <Message negative>
                <Message.Header>Your email is not validated yet</Message.Header>
                <p>You need to verify your email to publish your website</p>
                {/*<a>Resend validation email</a>*/}
            </Message>}

            <Grid centered columns={1}>
                <Grid.Column style={{maxWidth: 480, textAlign: 'center'}}>
                    <section style={{
                        paddingTop: 140,
                        paddingLeft: 32,
                        paddingRight: 32,
                        paddingBottom: 60,
                        backgroundColor: '#F4F7F9'
                    }}>
                        <H1 style={{fontSize: 32}}>{t("Welcome!")}</H1>

                        <p>{t("Now you can create your wedding website and invite guests.")}</p>

                        <Link to="/create"><Button style={{marginTop: 20}} primary fluid>{t("Create your website")}</Button></Link>
                        <Button basic color='orange' disabled={true} style={{marginTop: 20, marginBottom: 32}} fluid>{t("Create guest list")}</Button>
                    </section>

                    <Footer/>
                </Grid.Column>
            </Grid>
        </React.Fragment>
    }
}

export default connect(state => {
    return {
        user: state.user
    }
})(Screen)

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