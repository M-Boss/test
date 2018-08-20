/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Menu, Segment, Button, Form, Grid, Input} from 'semantic-ui-react'

export default class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return <Grid centered columns={1}>
            <Grid.Column  style={{maxWidth: 480}}>
                <div style={{paddingTop: 32, paddingLeft: 32, paddingRight: 32, backgroundColor: '#EFFDFF', textAlign: 'center'}}>
                    <img width={300}  src={require('../static/images/home-01.png')} alt="nikahku" />
                    <h1 style={{fontSize: 32}}>Create a free website for <strong style={{color: '#F3817A'}}>your wedding</strong></h1>

                    <h2 style={{fontSize: 21, fontWeight: 300, color: '#3d434e'}}>With easy to use templates and features to make your wedding planning that much easier.</h2>

                    <Button style={{marginTop: 28}}  primary>Register For Free</Button>
                </div>

            </Grid.Column>
        </Grid>
    }
}
