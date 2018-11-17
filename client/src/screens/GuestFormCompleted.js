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
    Loader,
    Message,
    Accordion,
    Table
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {H2} from "../components/Headers";
import Footer from "./Footer";
import {connect} from 'react-redux'
import BorderedButton from "../components/BorderedButton";
import Autocomplete from 'react-google-autocomplete';
import rest  from '../services/external/rest';
import Header from "./Header";
import DatePicker from 'react-datepicker';
import {t} from '../translations'
import withResend from '../components/withResend'
import InputCombo, {InputLabel} from '../components/InputCombo'
import {DateInput} from '../screens/Website'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const moment = require('moment');
const NotificationSystem = require('react-notification-system');
const {buildAction, buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
const _ = require("lodash");
const validator = require('../services/internal/validations');

class GuestFormCompleted extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        console.log('render: state: ', this.state);
        return (
            <React.Fragment>
                <div style={{padding: 24, paddingTop: 10, position: 'relative'}}>
                    <Segment color='grey'>

                        <div style={{paddingTop: 8, paddingBottom: 16, textAlign: 'center'}}>
                            <a href="/"><img width={200} src={require('../static/images/logo-header.svg')}/></a>
                        </div>
                        <H2 style={{ fontSize:28, marginBottom: 4, fontFamily: 'Great Vibes', textAlign: 'center'}}>
                            {t("You're all set!")}
                        </H2>
                        <div style={{textAlign: 'center', paddingTop: 24}}>
                            <Icon name='check circle outline' style={{ color: '#01b4c0', opacity: 0.7,  fontSize: 48}} />
                        </div>
                    </Segment>

                    <Segment style={{ backgroundColor: '#fafafa', textAlign: 'center'}} color='grey'>

                        <h3>
                            Have we been formally introduced?
                        </h3>
                        <p>
                            We're NikahKu, the wedding company that'll do anything for love. What's anything?
                        </p>
                        <a href="/" ><Button primary>Find Out</Button></a>
                    </Segment>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }

}

export default connect(state => {
    return {
        website: state.website,
        user: state.user
    }
})(GuestFormCompleted)
