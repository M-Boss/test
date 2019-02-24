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

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            success: false,
            current_password: '',
            new_password: '',
            new_password_repeat: '',
        };
        this.rest = rest;
    }

    componentDidMount(){
        if (!this.props.user.token) {
            this.props.history.push('/login')
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
        if(!this.state.current_password || !this.state.new_password || !this.state.new_password_repeat ){
            return alert('Please fill in the Email field');
        }

        if(this.state.new_password_repeat !== this.state.new_password){
            return alert("Kata sandi tidak cocok");
        }

        this.setState({loading : true});
        try {
            const r = await this.rest.post('user/change-password', this.state);
            this.setState({
                success: true,
                new_password:'',
                new_password_repeat: '',
                current_password: ''
            })
        }
        catch (e){
            // alert("That email is registered with another account.")
            alert("Email itu terdaftar di akun lain" )
            console.log(e);
        }
        finally{
            this.setState({loading: false})
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div style={{padding: 16}}>
                    <Link to="/account">
                        <p><Icon name="long arrow alternate left"/> {t("Back")}</p>
                    </Link>

                    <SemanticHeader dividing style={{marginTop: 12}}>Ubah Password</SemanticHeader>
                    {<Form style={{ paddingBottom: 24}}>
                        <Form.Input fluid onChange={this.changeHandler('current_password')} value={this.state.current_password}  label='Password saat ini'/>
                        <Form.Group widths='equal'>
                            <Form.Input onChange={this.changeHandler('new_password')} value={this.state.new_password} fluid  label="Password baru" />
                            <Form.Input onChange={this.changeHandler('new_password_repeat')} value={this.state.new_password_repeat}  fluid label="Ketik ulang Password baru" />
                        </Form.Group>
                        <br/>
                        <Form.Group>
                        <Form.Button loading={this.state.loading} onClick={this.save.bind(this)} primary>{t("Save")}</Form.Button>
                        </Form.Group>
                    </Form>}
                    {this.state.success &&   <Message positive>
                        <p>Operasi yang sukses</p>
                    </Message>}
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default connect(state => {
    return {
        user: state.user
    }
})(ChangePassword)
