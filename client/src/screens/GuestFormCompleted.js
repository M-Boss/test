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
                <Header />

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
