/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image} from 'semantic-ui-react'
import Slider from "react-slick";
// import Footer from "./Footer";
import {H1, H2} from "../../../components/Headers";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from './Header'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const website = this.props.website;
        return (
            <div style={{overflow: 'hidden'}}>
                <Header label={website.bride_first + " & " + website.groom_first} />
                <div style={{position: 'relative'}}>
                    <img style={{width: '100%'}} src={require('./assets/bg-1.png')} />
                    <em><h1 style={{textAlign: 'center', width: '100%', position: 'absolute', top: 45, color: 'white', textShadow: '1px 1px #777'}}>We're <br/> getting married!</h1></em>
                    <img style={{marginTop: -30}} src={require('./assets/flower-top.png')} />
                </div>
                <div style={{position: 'relative', paddingBottom: 130}}>
                    <em style={{textAlign: 'center'}}>
                        <h1>{website.groom_first  + " " + website.groom_last}</h1>
                        <h2>{website.bride_first  + " " + website.bride_last}</h2>
                    </em>
                    <img style={{position: 'absolute', top: 40, left: '50%', marginLeft: -80, width: 160, height: 160, marginTop: -80}} src={require('./assets/center.png')} />
                </div>

                <div style={{zIndex: 1}}>
                    <div style={{ height:100, width: '150%', marginLeft: -20, transform: 'rotate(-15deg)', backgroundColor: '#f1f4f8'}}></div>
                </div>
                <div style={{zIndex: 10}}>
                    <img style={{ marginTop: -250, transform: 'rotate(-0deg)'}} align="right" src={require('./assets/flower-bottom.png')} />
                    <div style={{clear: 'both'}}> </div>
                </div>

                <div style={{ height: 300, marginTop: -30, backgroundColor: '#f1f4f8'}}>

                </div>
            </div>
        )
    }

}

export default connect(state => {
    return {
        user: state.user
    }
})(Home);