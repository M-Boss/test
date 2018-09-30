/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image, Icon, Checkbox} from 'semantic-ui-react'
import Slider from "react-slick";
import Footer from "./Footer";
import Header from "./Header";
import {H1, H2, H3} from "../components/Headers";
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import container from '../services'
const {buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            templates: [
                {
                    id: 1,
                    name: "Willowmarsh - Tea rose"
                },
                {
                    id: 2,
                    name: "Second template"
                },
                {
                    id: 3,
                    name: "Third template"
                },
                {
                    id: 4,
                    name: "Fourth template"
                },
                {
                    id: 5,
                    name: "Fifth template"
                }
            ]
        };
    }

    onTemplateSelected(t) {
        console.log(t);
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'template');
        this.props.dispatch(action(t.id))
    }


    render() {
        return (<React.Fragment>
                <Header />

                <div style={{padding: 16, backgroundColor: '#F4F7F9'}}>
                    <Link to="/create">
                        <p><Icon name="long arrow alternate left"/> Back</p>
                    </Link>
                    <H3>Templates </H3>
                    {this.state.templates.map(t => {
                        const current = t.id === this.props.website.template;
                        return (
                            <div onClick={() => this.onTemplateSelected(t)}
                                 style={{backgroundColor: 'white', marginBottom: 20}}>
                                <div style={{padding: 20, paddingBottom: 16, alignItems: 'center', display: 'flex'}}>
                                    {current ? <Checkbox style={{marginRight: 8}} checked readOnly/> : null}
                                    <span > {t.name}</span>
                                </div>
                                <div style={{paddingLeft: 20, paddingRight: 20}}>
                                    <img style={{width: '100%'}} src={require('../static/images/templates/template-' + t.id + '.jpg')}
                                         alt={"Template: " + t.name}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default connect(state => {
    return {
        website: state.website
    }
})(Screen)
