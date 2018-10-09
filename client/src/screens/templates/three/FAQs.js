/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image, Icon} from 'semantic-ui-react'
import Slider from "react-slick";
// import Footer from "./Footer";
import {H1} from "../../../components/Headers";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from '../Header'
import moment from 'moment'
import config from '../../../services/internal/config/Config';
import _ from 'lodash'
import Footer from "../Footer";
import Accordion from "../components/Accordion";

class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {website, theme} = this.props;
        return (
            <div className="template-3" style={{overflow: 'hidden', backgroundColor: theme.background}}>

                <Header website={website} theme={theme} themeColor={this.props.theme.primary} websiteId={this.props.websiteId}
                        label={website.bride_first + " & " + website.groom_first}/>
                <div style={{textAlign: 'center', padding: 24,  paddingTop: 32}}>
                    <img style={{opacity: 0.8}} src={require('./assets/top.png')}/>
                    <h1 className="cursive"
                        style={{marginTop: 40, marginBottom: 40, textAlign: 'center', color: theme.foreground}}>
                        Faqs</h1>
                    <div style={{marginTop: 20, marginBottom: 100}}>
                        <Accordion answerColor={theme.foreground} answerBackgroundColor={'transparent'}
                                   borderColor={theme.foreground}
                                   radius={1}
                                   textColor={theme.foreground} items={this.getAccordionSections()}/>
                    </div>
                </div>
                <Footer theme={theme}/>
            </div>
        )
    }

    getAccordionSections() {
        return _.get(this.props.website, "faqs", []).map(({question, answer}) => {
            return {
                title: question,
                questionColor: '#f9f9f9',
                content: <div style={{padding: 12, textAlign: 'left'}}>{answer}</div>
            }
        })
    }
}

export default connect(state => {
    return {
        user: state.user
    }
})(Photos);