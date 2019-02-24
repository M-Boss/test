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
    List,
    Message,
    Header as SemanticHeader
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
import Required from './Website'
import {t} from '../translations'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const {buildAction, buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
const _ = require("lodash");
const validator = require('../services/internal/validations');

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            success: false,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
        };
        this.rest = rest;
    }

    componentDidMount(){
        if (!this.props.user.token) {
            this.props.history.push('/login')
        }

        this.getAccountInfo();
    }

    async getAccountInfo() {
        this.setState({loading: true});
        try {
            let response = await rest.post('user/authenticate');
            let user = _.get(response, 'user', {});
            if (!user) throw "";
            this.setState({
                first_name: _.get(user, 'first_name'),
                last_name: _.get(user, 'last_name'),
                phone: _.get(user, 'phone'),
                email: _.get(user, 'email'),
            });
        }
        catch (e) {
            alert("Could not fetch tasks, please try again momentarily")
            console.log(e);
        }
        finally {
            this.setState({loading: false});
        }
    }

    changeHandler(key, direct = false) {
        return (e) => {
            const val = direct ? e : e.target.value;
            this.setState({
                [key]: val
            })
        }
    }

    async save(){
        if(!this.state.email ){
            return alert('Please fill in the Email field');
        }

        this.setState({loading : true});
        try {
            const r = await this.rest.post('user/update-info', this.state);
            this.setState({success: true})
        }
        catch (e){
            // alert("That email is registered with another account.")
            alert("Email itu terdaftar di akun lain")
        }
        finally{
            this.setState({loading: false})
        }
    }

    render() {
        console.log('state: ', this.state);
        return (
            <React.Fragment>
                <Header />
                <div style={{padding: 16}}>
                    <SemanticHeader dividing style={{marginTop: 12}}>{t("Account Settings")}</SemanticHeader>
                    {<Form style={{ paddingBottom: 24}}>
                        <Form.Group widths='equal'>
                            <Form.Input onChange={this.changeHandler('first_name')} value={this.state.first_name} fluid  label={t("First Name")} placeholder={t("First Name")} />
                            <Form.Input onChange={this.changeHandler('last_name')} value={this.state.last_name}  fluid label={t("Last Name")} placeholder={t("Last Name")} />
                        </Form.Group>
                        <Form.Input fluid onChange={this.changeHandler('email')} value={this.state.email}  label='Email' placeholder='some@mail.com' />

                        <Form.Field>
                            <label>{t("Phone")}</label>
                            <PhoneInput
                                country="ID"
                                placeholder="Phone number"
                                value={ this.state.phone }
                                onChange={ phone => this.setState({ phone }) } />
                        </Form.Field>

                        <br/>
                        <Form.Group>
                        <Form.Button loading={this.state.loading} onClick={this.save.bind(this)} primary>{t("Save")}</Form.Button>
                            <Link to='/change-password'><Form.Button loading={this.state.loading}>{t("Change Password")}</Form.Button></Link>
                        </Form.Group>
                    </Form>}
                    {this.state.success &&   <Message positive>
                        <p>Akun diperbarui</p>
                    </Message>}
                </div>
                <Footer/>
            </React.Fragment>
        )
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
        user: state.user
    }
})(Account)
