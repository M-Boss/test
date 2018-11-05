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
    Message
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
import withResend from '../components/withResend'
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

        this.state.justActivated = _.get(props, "location.hash", "").substring(1) === 'activated';
        if(this.state.justActivated){
            props.dispatch(buildActionForKey(actions.USER_RECORD, 'active')(1))
        }
        setTimeout( ()=> {
            this.setState({justActivated: false})
        }, 2000)
    }

    render() {
        const percentage = Math.floor(validator.getPercentage(this.props.website) * 100);
        return (
            <React.Fragment>
                <Header />

                {this.state.justActivated &&
                <Message success>
                    <Message.Header>Email validated</Message.Header>
                </Message>}

                <div style={{
                    backgroundColor: '#F4F7F9',
                    padding: 12,
                    paddingTop: 32,
                    paddingBottom: 150,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    <Service icon={require('../static/images/services/website.png')} label="Website"
                             link="/dashboard"/>
                    <Service icon={require('../static/images/services/daftarperiksa.png')} label="Daftar Periksa"
                             link="/checklist" />
                    <Service icon={require('../static/images/services/daftar-tamu(grey).png')} label="Daftar Tamu"
                             link=""/>
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

function Service({label, icon, link}) {
    return (
        <div style={{flex: 1, textAlign: 'center'}}>
            {link ? <Link to={link}>
                <img style={{height: 80, width: 80}} src={icon}/>
                <p style={{textAlign: 'center'}}>{label}</p>
            </Link> :
                <React.Fragment>
                    <img style={{height: 80, width: 80}} src={icon}/>
                    <p style={{marginBottom: 2, textAlign: 'center'}}>{label}</p>
                    {!link && <p style={{fontSize: 11}}>(Coming soon!)</p>}
                </React.Fragment>}
        </div>
    )
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
})(withResend(Website))
