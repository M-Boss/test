/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Menu, Segment, Button, Form, Grid, Input} from 'semantic-ui-react'
import Slider from "react-slick";

export default class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return <Grid centered columns={1}>
            <Grid.Column style={{maxWidth: 480, textAlign: 'center'}}>
                <section style={{paddingTop: 32, paddingLeft: 32, paddingRight: 32, backgroundColor: '#EFFDFF'}}>
                    <img width={300} src={require('../static/images/home-01.png')} alt="nikahku"/>
                    <h1 style={{fontSize: 32}}>Create a free website for <strong style={{color: '#F3817A'}}>your
                        wedding</strong></h1>

                    <h2 style={{fontSize: 21, fontWeight: 300, color: '#3d434e'}}>With easy to use templates and
                        features to make your wedding planning that much easier.</h2>

                    <Button style={{marginTop: 20, marginBottom: 32}} primary>Register For Free</Button>
                </section>

                <section style={{paddingTop: 48, paddingLeft: 32, paddingRight: 32,}}>
                    <h2 style={{fontSize: 26}}>Templates</h2>
                    <p style={{fontSize: 18}}>100+ Easy to use templates to match
                        your specific needs</p>

                    {this.renderCarousel()}

                    <Button style={{marginTop: 20, marginBottom: 32}} primary>Choose Your Template</Button>
                </section>

            </Grid.Column>
        </Grid>
    }

    renderCarousel(){
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

                    <img src={require('../static/images/slide-01.jpg')} />

                    <img src={require('../static/images/slide-02.jpg')} />
                    <img src={require('../static/images/slide-03.jpg')} />
            </Slider>
        )
    }
}
