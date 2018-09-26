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

const {buildAction, buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
const _ = require("lodash");
const validator = require('../services/internal/validations');

class Website extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            success: false,
            name: 'm',
            email: 'a@b.com',
            title: 'title',
            message: 'messageb ody',
            phone: '0911'
        };
        this.rest = rest;
    }

    changeHandler(key, direct = false) {
        return (e) => {
            const val = direct ? e : e.target.value;
            this.setState({
                [key]: val
            })


        }
    }

    async send(){
        if(!this.state.email || !this.state.name || !this.state.title || !this.state.message){
            return alert('Please fill in the necessary fields');
        }

        this.setState({loading : true});
        try {
            const r = await this.rest.post('contact', this.state);
            this.setState({success: true})
        }
        catch (e){
            alert("Please try again in a few minutes")
        }
        finally{
            this.setState({loading: false})
        }

    }


    render() {
        const percentage = Math.floor(validator.getPercentage(this.props.website) * 100);
        console.log(this.state);
        return (
            <React.Fragment>
                <Header />
                <div style={{padding: 16}}>
                    <SemanticHeader dividing style={{marginTop: 12}}>Contact Info</SemanticHeader>
                    <List>
                        <List.Item title="Whatsapp"  icon='whatsapp' content='+6281280010017' />
                        <List.Item icon='instagram' content={<a href='https://www.instagram.com/nikahku.id/'>nikahku.id</a>} />
                        <List.Item icon='facebook' content={<a href='https://www.facebook.com/NikahKu/'>NikahKu</a>} />
                        <List.Item
                            icon='mail'
                            content={<a href='mailto:contact@nikahku.com'>contact@nikahku.com</a>}
                        />
                    </List>

                    <SemanticHeader dividing style={{marginTop: 48}}>Send us a line</SemanticHeader>
                    {!this.state.success && <Form style={{ paddingBottom: 24}}>
                        <Form.Group widths='equal'>
                            <Form.Input onChange={this.changeHandler('name')} value={this.state.name} fluid  label='Nama *' placeholder='Nama' />
                            <Form.Input onChange={this.changeHandler('phone')} value={this.state.phone}  fluid label='Nomer Telepon' placeholder='Optional' />
                        </Form.Group>
                        <Form.Input fluid onChange={this.changeHandler('email')} value={this.state.email}  label='Email *' placeholder='some@mail.com' />
                        <Form.Input fluid onChange={this.changeHandler('title')}  value={this.state.title}  label='Pertanyaan *' placeholder='Pertanyaan' />
                        <Form.TextArea onChange={this.changeHandler('message')}
                                       value={this.state.message}  label='Detail *' placeholder='Tell us more about the matter...' />
                        <Form.Button loading={this.state.loading} onClick={this.send.bind(this)} fluid>Send</Form.Button>
                    </Form>}

                    {this.state.success &&   <Message positive>
                        <p>Message sent!</p>
                    </Message>}
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
                    {!link && <p style={{fontSize: 11}}>(Comming soon!)</p>}
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
})(Website)
