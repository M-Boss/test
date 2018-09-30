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
                <img style={{ width: '100%', opacity: 0.8}} src={require('./assets/down' + theme.index + '.png')}/>
                <h1 style={{marginTop: 40, marginBottom: 40, textAlign: 'center', fontFamily: 'serif', color: theme.primary}}>FAQs</h1>
                <div style={{marginTop: 20, marginBottom: 100}}>
                    <Accordion  textColor={theme.primary} items={this.getAccordionSections()} />
                </div>
                <Footer theme={theme}/>
            </div>
        )
    }

    getAccordionSections(){
        return _.get(this.props.website, "faqs", []).map(({question, answer}) => {
            return {
                title: question,
                questionColor: '#f9f9f9',
                content: <div style={{padding: 12, color: this.props.theme.primary}}>{answer}</div>
            }
        })
    }
}


class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.startingIndex || 0
        }
    }

    render() {
        const selectedStyle = {
            border: 'solid',
            borderWidth: 1,
            borderColor: '#E0E6E7',
            borderRadius: 4,
            overflow: 'hidden'
        };

        return this.props.items.map(({title, content, questionColor = "#f3f5f8", textColor = this.props.textColor || '#222'}, index) => {

            const current = index === this.state.index;
            return (
                <div key={index} style={{marginBottom: 8, userSelect: 'none', ...(current ? selectedStyle : {})}}>
                    <div onClick={() => this.onHeaderClicked(index)} style={{padding: 12, backgroundColor: questionColor}}>
                        <p style={{color: textColor, fontSize: 16, margin: 0, lineHeight: '40px', float: 'left'}}>
                            {title}
                        </p>
                        <Icon style={{lineHeight: '40px', float: 'right'}} name={current ? 'angle up' : 'angle down'}/>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    {this.state.index === index &&
                    <div style={{
                        backgroundColor: '#FFF',
                        paddingTop: 0,
                        border: 'solid',
                        borderWidth: 0,
                        borderTopWidth: 1,
                        borderColor: '#E0E6E7'
                    }}>{content}</div>
                    }
                </div>
            )
        })
    }

    onHeaderClicked(index) {
        this.setState({
            index: this.state.index === index ? -1 : index
        })
    }
}


export default connect(state => {
    return {
        user: state.user
    }
})(Photos);