/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {
    Menu,
    Segment,
    Button,
    Form,
    Grid,
    Icon,
    Input,
    Label,
    Checkbox,
    TextArea,
    Select,
    Dimmer,
    Loader
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {H1, H2} from "../components/Headers";
import Footer from "./Footer";
import Header from "./Header";
import {connect} from 'react-redux'
import BorderedButton from "../components/BorderedButton";
import Autocomplete from 'react-google-autocomplete';
import rest  from '../services/external/rest';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const {buildAction, buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
const _ = require("lodash");
const validator = require('../services/internal/validations');

class Website extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.rest = rest;


    }

    render() {

        const percentage = Math.floor(validator.getPercentage(this.props.website) * 100);

        return (
            <React.Fragment>
                    <Header />

                <div style={{backgroundColor: '#F4F7F9', padding: 12}}>
                    <div style={{backgroundColor: '#FFFFFF'}}>
                        <div style={{padding: 12, display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                            <H2 style={{flex: 1, fontSize: 18}}>Your Wedding Website</H2>
                            <div style={{width: 50}}>
                                <CircularProgressbar
                                    styles={{
                                        path: {stroke: `rgba(99, 224, 156, 1)`},
                                        text: {fill: '#222'},
                                    }}
                                    percentage={percentage}
                                    text={`${percentage}%`}
                                />
                            </div>
                        </div>

                        {this.props.website.template !== 0 &&
                        <div style={{margin: 12, marginTop: 2}}>
                            <img style={{width: '100%'}} src={require('../static/images/template-01.jpg')}
                                 alt={"Selected template"}/>
                        </div>}

                        <div style={{padding: 12, paddingBottom: 32}}>
                            {
                                validator.getKeys().map(k => {
                                    return <Section label={validator.labelOf(k)}
                                                    k={k}
                                                    done={validator.isValid(k, this.props.website)}/>
                                })
                            }
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>

        )
    }

    componentDidMount() {
        if (!this.props.user.token) {
            this.props.history.push('/login')
        }
    }

    changeHandler(key, checkbox = false) {
        return (e) => {
            const websiteAttributeAction = buildActionForKey(actions.WEBSITE_RECORD, key);
            const val = checkbox ? e : e.target.value;
            this.props.dispatch(websiteAttributeAction(val))
        }
    }
}


function Section({label, done, k}) {
    return (
        <Link to={"/create#" + k}>
            <p style={{fontSize: 18, marginTop: 30, marginLeft: 10}}>
                {done &&
                <Icon style={{fontSize: 20, paddingRight: 10, color: '#63E09C'}} name='check circle'/>}

                {!done &&
                <Icon style={{fontSize: 18, paddingRight: 10, color: '#ddd'}} name='circle'/>}

                {label}
                <Icon style={{fontSize: 12, paddingLeft: 10, color: '#888'}} name='pencil'/>
            </p>
        </Link>
    )
}
export default connect(state => {
    return {
        website: state.website,
        user: state.user
    }
})(Website)
