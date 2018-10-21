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
import {t} from '../../../translations'
import Accordion from "../components/Accordion";

class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {website, theme} = this.props;
        return (
            <div style={{overflow: 'hidden', fontFamily: 'serif'}}>

                <Header website={website}  themeColor={this.props.theme.primary} websiteId={this.props.websiteId} label={website.bride_first + " & " + website.groom_first}/>
                <h1 style={{marginTop: 40, marginBottom: 40, textAlign: 'center', fontFamily: 'serif', color: theme.primary}}>{website.faqs_page_title || t('FAQs')}</h1>
                <div style={{marginTop: 20, marginBottom: 100}}>
                    <Accordion textColor={theme.primary} items={this.getAccordionSections()} />
                </div>
                <Footer theme={theme}/>
            </div>
        )
    }

    getAccordionSections(){
        return _.get(this.props.website, "faqs", []).map(({question, answer}) => {
            return {
                title: question,
                content: <div style={{padding: 12, color: this.props.theme.primary}}>{answer}</div>
            }
        })
    }
}



export default connect(state => {
    return {
        user: state.user
    }
})(Photos);