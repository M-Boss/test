/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image} from 'semantic-ui-react'
import Slider from "react-slick";
import Footer from "./Footer";
import {H1} from "../components/Headers";
import {Link} from "react-router-dom"

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Grid centered columns={1}>
            <Grid.Column style={{maxWidth: 480, textAlign: 'center'}}>
                <section style={{paddingTop: 140, paddingLeft: 32, paddingRight: 32, paddingBottom: 60, backgroundColor: '#F4F7F9'}}>
                    <H1 style={{fontSize: 32}}>Welcome!</H1>

                    <p>
                        Now you can create your wedding  website and invite guests.
                    </p>

                    <Link to="/create"><Button style={{marginTop: 20}} primary fluid>Create Your Website</Button></Link>
                    <Button basic color='orange' disabled={true} style={{marginTop: 20, marginBottom: 32}} fluid>Create Guests List (Coming Soon)</Button>

                </section>

                <Footer/>
            </Grid.Column>
        </Grid>
    }
}


function Step({step, title, body, image}){
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

function RSVPRow({children}){
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