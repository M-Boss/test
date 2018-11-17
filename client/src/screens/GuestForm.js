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
    Table,
    Divider
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

class GuestForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            plus: false,
            state: 'create'
        };
        this.rest = rest;
        this.addPlusOne = this.addPlusOne.bind(this);
        this.removePlus = this.removePlus.bind(this);

        this.invitation_token = props.match.params.invitation_token;
    }

    async save(rest, data) {
        if (!data.first_name) {
            return alert(t("Please enter all required fields"))
        }

        try {
            this.setState({loading: true});
            let body = {
                info: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    title: data.title,
                    // unknown: data.unknown
                },
                /*children: (data.children || []).map(c => {
                    return {
                        first_name: c.first_name,
                        last_name: c.last_name,
                        title: c.title,
                        unknown: c.unknown
                    }
                }),*/
                street: data.street,
                city: data.city,
                country: data.country,
                postal_code: data.postal_code,
                relationship: data.relationship,
                email: data.email,
                mobile: data.mobile,
                definitely_invited: 1,
            };

            if (data.plus) {
                body.plus = {
                    first_name: data.plus_first_name,
                    last_name: data.plus_last_name,
                    title: data.plus_title,
                    // unknown: data.plus_unknown
                }
            }


            await rest.post('guestlist-public/store_guest', {
                guest: body,
                invitation_token: this.invitation_token
            });

            this.props.history.push('/guest-form-completed');
            return true;
        }
        catch (e) {
            alert("Please try again momentarily");
            console.log(e)
            return false;
        }
        finally {
            this.setState({loading: false});
        }
    }

    render() {
        const guestlist = _.get(this.state, 'guestlist');

        console.log('render: state: ', this.state);
        return (
            <React.Fragment>

                <div className="guest-form" style={{backgroundColor: '#F4F7F9'}}>
                    {this.state.info && this.state.state === 'create' && this.renderCreate()}
                </div>

                <Footer/>
            </React.Fragment>
        )
    }

    renderCreate() {
        const titles = [
            {value: "Mr.", text: "Mr."},
            {value: "Mrs.", text: "Mrs."},
            {value: "Ms.", text: "Ms."},
            {value: "Dr.", text: "Dr."},
        ];
        const relationships = [
            {value: "Bride's Family", text: "Bride's Family"},
            {value: "Bride's Friend", text: "Bride's Friend"},
            {value: "Bride's Family Friend", text: "Bride's Family Friend"},
            {value: "Groom's Family", text: "Groom's Family"},
            {value: "Groom's Friend", text: "Groom's Friend"},
            {value: "Groom's Family Friend", text: "Groom's Family Friend"},
            {value: "Bride And Groom's Friend", text: "Bride And Groom's Friend"},
        ];
        const panels = [
            {
                key: `panel-0`,
                title: "Mailing Address",
                content: {
                    content: <div>
                        <InputCombo style={{marginTop: 8}} onChange={this.createChangeHandler('street')}
                                    value={this.state.street}
                                    optional
                                    label={t("Street")}/>

                        <InputCombo style={{marginTop: 8}} onChange={this.createChangeHandler('country')}
                                    value={this.state.country}
                                    optional
                                    label={t("Country")}/>

                        <InputCombo style={{marginTop: 8}} onChange={this.createChangeHandler('city')}
                                    value={this.state.city}
                                    optional
                                    label={t("City")}/>

                        <InputCombo style={{marginTop: 8}} onChange={this.createChangeHandler('postal_code')}
                                    value={this.state.postal_code}
                                    optional
                                    label={t("Postal Code")}/>
                    </div>,
                }
            },
            {
                key: `panel-1`,
                title: "Email / Mobile",
                content: {
                    content: <div>
                        <InputCombo style={{marginTop: 8}} onChange={this.createChangeHandler('email')}
                                    value={this.state.email}
                                    optional
                                    label={t("Email")}/>

                        <InputCombo style={{marginTop: 8}} onChange={this.createChangeHandler('mobile')}
                                    value={this.state.mobile}
                                    optional
                                    label={t("Mobile")}/>
                    </div>,
                }
            }
        ];

        const brideFirst = _.get(this.state, 'info.bride_first');
        const groomFirst = _.get(this.state, 'info.groom_first');

        return (
            <div style={{padding: 24, paddingTop: 10, position: 'relative'}}>



                <Segment color='grey'>

                    <div style={{paddingTop: 8, paddingBottom: 16, textAlign: 'center'}}>
                        <img width={200} src={require('../static/images/logo-header.svg')}/>
                    </div>
                    <H2 style={{ fontSize:28, marginBottom: 4, fontFamily: 'Great Vibes', textAlign: 'center'}}>{t("Hello!")}</H2>
                    <p style={{ color: '#888', marginBottom: 24,  textAlign: 'center'}}>Please fill out the form below
                        {groomFirst && brideFirst ? `, so ${brideFirst} & ${groomFirst} can send you their wedding details` : ''}
                            .Your info will not be shared with anyone else.</p>

                    <Divider />
                    <br/>

                    <Form>
                        <Form.Select
                            onChange={(e, {value}) => this.createChangeHandler('title', true)(value)}
                            value={this.state.title}
                            fluid label={t("Title")} options={titles}/>

                        <InputCombo style={{marginTop: 4}} onChange={this.createChangeHandler('first_name')}
                                    value={this.state.first_name}
                                    label={t("First Name")}/>

                        <InputCombo style={{marginTop: 8}} onChange={this.createChangeHandler('last_name')}
                                    value={this.state.last_name}
                                    optional
                                    label={t("Last Name")}/>

                        {!this.state.plus && <div className="pointer" style={{
                            color: '#21899A',
                            marginTop: 12,
                            marginBottom: 8,
                            padding: 8,
                            paddingLeft: 0,
                        }} onClick={this.addPlusOne}>
                            <Icon name="plus circle"/> {t("Add Plus One")}
                        </div>}

                        {this.state.plus && <div style={{
                            borderLeft: '2px solid teal',
                            paddingLeft: 8,
                            marginTop: 16,
                            marginBottom: 16,
                            paddingTop: 8,
                            paddingBottom: 8,
                            borderTop: '1px solid #f2f2f2',
                            borderBottom: '1px solid #f2f2f2'
                        }}>
                            <div style={{paddingBottom: 12, display: 'flex', alignItems: 'center'}}>
                                <label style={{fontWeight: '700', flex: 1}}>{t("Plus One")}</label>
                                <div onClick={this.removePlus} className="pointer" style={{padding: 4}}>
                                    <Icon name='close' size={16}/>
                                </div>
                            </div>
                            {/*<Checkbox style={{marginBottom: 10}} label={t("Name Unknown")}*/}
                                      {/*onChange={(e, {checked}) => this.createChangeHandler('plus_unknown', true)(checked)}*/}
                                      {/*toggle checked={this.state.plus_unknown}/>*/}

                            <Form.Select
                                disabled={this.state.plus_unknown}
                                onChange={(e, {value}) => this.createChangeHandler('plus_title', true)(value)}
                                value={this.state.plus_title}
                                fluid label={t("Title")} options={titles}/>

                            <InputCombo disabled={this.state.plus_unknown} style={{marginTop: 4}}
                                        onChange={this.createChangeHandler('plus_first_name')}
                                        value={this.state.plus_first_name}
                                        label={t("First Name")}/>

                            <InputCombo disabled={this.state.plus_unknown} style={{marginTop: 8}}
                                        onChange={this.createChangeHandler('plus_last_name')}
                                        value={this.state.plus_last_name}
                                        optional
                                        label={t("Last Name")}/>
                        </div>}

                        <Form.Select
                            onChange={(e, {value}) => this.createChangeHandler('relationship', true)(value)}
                            value={this.state.relationship}
                            fluid label={t("Relationship To You")} options={relationships}/>

                        <Accordion style={{marginTop: 32}} defaultActiveIndex={[0,1]}
                                   panels={panels} exclusive={false} fluid/>
                    </Form>
                </Segment>
                <Button onClick={() => this.save(this.rest, this.state)} primary>{t("Save")}</Button>
            </div>
        )
    }

    createChangeHandler(field, checkbox) {
        return (e) => {
            const val = checkbox ? e : e.target.value;
            this.setState({
                [field]: val
            })
        }
    }

    addPlusOne() {
        this.setState({plus: true});
    }

    removePlus() {
        this.setState({plus: false});
    }

    async getGuestlistInfo() {
        this.setState({loading: true});
        try {
            let response = await rest.post('guestlist-public/info/', {invitation_token: this.invitation_token});
            console.log('getGL ', response);
            let info = _.get(response, 'info', {});

            // if (!guestlist) throw "";
            //
            this.setState({
                info
            });
        }

        catch (e) {
            alert("Could not fetch data, please try again momentarily");
            console.log(e);
        }
        finally {
            this.setState({loading: false});
        }
    }

    componentDidMount() {
        this.getGuestlistInfo();
    }
}

export default connect(state => {
    return {
        website: state.website,
        user: state.user
    }
})(GuestForm)
