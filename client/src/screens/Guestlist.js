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

const moment = require('moment');
const NotificationSystem = require('react-notification-system');
const {buildAction, buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
const _ = require("lodash");
const validator = require('../services/internal/validations');

class Guestlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            state: 'index', //index, create
            tab: 'single', // createGuestTab: single, family
            plus: false,
            children: [],
            definitely_invited: 0
        };
        this.rest = rest;
        this.addChild = this.addChild.bind(this);
        this.removeChildByIndex = this.removeChildByIndex.bind(this);
        this.addPlusOne = this.addPlusOne.bind(this);
        this.removePlus = this.removePlus.bind(this);
        this.saveAndNext = this.saveAndNext.bind(this);
        this.saveAndClose = this.saveAndClose.bind(this);
        this.cancel = this.cancel.bind(this);
        this.closeCreate = this.closeCreate.bind(this);
        this.deleteGuest = this.deleteGuest.bind(this);
    }

    async deleteGuest(){
        if(!window.confirm("Are you sure you want to delete guest?")){
            return false;
        }

        try {
            this.setState({loading: true});
            await rest.post('guestlist/remove_guest', {
                id: this.state.id
            });
            this.closeCreate();
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
                    unknown: data.unknown
                },
                children: (data.children || []).map(c => {
                    return {
                        first_name: c.first_name,
                        last_name: c.last_name,
                        title: c.title,
                        unknown: c.unknown
                    }
                }),
                street: data.street,
                city: data.city,
                country: data.country,
                postal_code: data.postal_code,
                relationship: data.relationship,
                email: data.email,
                mobile: data.mobile,
                definitely_invited: data.definitely_invited,
                id: data.id
            };

            if (data.plus) {
                body.plus = {
                    first_name: data.plus_first_name,
                    last_name: data.plus_last_name,
                    title: data.plus_title,
                    unknown: data.plus_unknown
                }
            }


            await rest.post('guestlist/store_guest', {guest: body});
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
                <Header />

                {!!guestlist &&
                <div className="checklist" style={{backgroundColor: '#F4F7F9'}}>
                    {this.state.state === 'create' && this.renderCreate()}
                    {this.state.state === 'index' && this.renderContent(guestlist)}
                </div>}

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

        return (
            <div style={{padding: 24, paddingTop: 10, position: 'relative'}}>
                <div className="pointer" onClick={this.closeCreate}
                     style={{position: 'absolute', right: 12, top: 24, width: 40, height: 40}}>
                    <Icon name="close" style={{fontSize: 24}}/>
                </div>

                <H2 style={{textAlign: 'center'}}>{t("Add Guests")}</H2>

                <div style={{maxWidth: 400, margin: 'auto', textAlign: 'center', marginBottom: 32, marginTop: 20}}>
                    <Menu pointing secondary compact>
                        <Menu.Item name={t("Single or Couple")} active={this.state.tab === 'single'}
                                   onClick={this.createGuestTab('single')}/>
                        <Menu.Item name={t("Family")} active={this.state.tab === 'family'}
                                   onClick={this.createGuestTab('family')}/>
                    </Menu>
                </div>

                {!!this.state.id && <div style={{textAlign: 'right'}}>
                    <Button onClick={this.deleteGuest}
                                            icon
                                            labelPosition='left'
                                            primary size='small'>
                    <Icon name='trash'/> {t("Delete")}
                </Button></div>}

                <Segment color='grey'>
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
                            <Checkbox style={{marginBottom: 10}} label={t("Name Unknown")}
                                      onChange={(e, {checked}) => this.createChangeHandler('plus_unknown', true)(checked)}
                                      toggle checked={this.state.plus_unknown}/>

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

                        {this.state.tab === 'family' && this.state.children && this.state.children.map && this.state.children.map((c, index) => {
                            return (
                                <div style={{
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
                                        <label style={{
                                            fontWeight: '700',
                                            flex: 1
                                        }}>{t("Child") + ' ' + (index + 1)}</label>
                                        <div onClick={() => this.removeChildByIndex(index)} className="pointer"
                                             style={{padding: 4}}>
                                            <Icon name='close' size={16}/>
                                        </div>
                                    </div>
                                    <Checkbox style={{marginBottom: 10}} label={t("Name Unknown")}
                                              onChange={(e, {checked}) => this.editChild(index, 'unknown', true)(checked)}
                                              toggle checked={c.unknown}/>

                                    <InputCombo disabled={c.unknown} style={{marginTop: 4}}
                                                onChange={this.editChild(index, 'first_name')}
                                                value={c.first_name}
                                                label={t("First Name")}/>

                                    <InputCombo disabled={c.unknown} style={{marginTop: 8}}
                                                onChange={this.editChild(index, 'last_name')}
                                                value={c.last_name}
                                                optional
                                                label={t("Last Name")}/>
                                </div>
                            )
                        })}

                        {this.state.tab === 'family' && <div className="pointer" style={{
                            color: '#21899A',
                            marginTop: 12,
                            marginBottom: 8,
                            padding: 8,
                            paddingLeft: 0,
                        }} onClick={this.addChild}>
                            <Icon name="plus circle"/> {t("Add Child")}
                        </div>}

                        <Form.Select
                            onChange={(e, {value}) => this.createChangeHandler('relationship', true)(value)}
                            value={this.state.relationship}
                            fluid label={t("Relationship To You")} options={relationships}/>

                        <Form.Group inline>
                            <label>{t("Invitation?")}</label>
                            <Form.Radio
                                label='Definitely'
                                value='1'
                                checked={this.state.definitely_invited}
                                onChange={() => this.createChangeHandler('definitely_invited', true)(1)}
                            />

                            <Form.Radio
                                label='Maybe'
                                value='0'
                                checked={!this.state.definitely_invited}
                                onChange={() => this.createChangeHandler('definitely_invited', true)(0)}
                            />
                        </Form.Group>

                        <Accordion style={{marginTop: 32}} defaultActiveIndex={[]}
                                   panels={panels} exclusive={false} fluid/>


                    </Form>
                </Segment>

                <br/>
                <br/>
                <Button onClick={this.saveAndNext} primary>{t("Save & Add Another")}</Button>
                <Button onClick={this.saveAndClose} primary>{t("Save & Close")}</Button>
            </div>
        )
    }

    renderContent(guestlist) {
        return (<React.Fragment>
            <div style={{padding: 24, paddingBottom: 0}}>

                <Link to="/services">
                    <p><Icon name="long arrow alternate left"/> Back</p>
                </Link>

                <div style={{
                    display: 'flex', flexWrap: 'wrap',
                    marginTop: 20,
                }}>
                    <div className="responsive-half" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 20
                    }}>
                        <H2 style={{
                            flex: 1,
                            margin: 0,
                            lineHeight: '22px',
                            float: 'left'
                        }}>{t("Guestlist")}</H2>
                    </div>

                    {/*<div className="responsive-half desktop-right">*/}
                    {/*<Button onClick={() => this.openCreate()} primary>{t("Add Guest")}</Button>*/}
                    {/*</div>*/}
                </div>

                {/*<div>
                 <div style={{marginTop: 35}}/>

                 <Label color="teal">
                 {t('Days Left')}
                 <Label.Detail>{24}</Label.Detail>
                 </Label>

                 <Label color="teal">
                 {t('Tasks This Month')}
                 <Label.Detail>{35}</Label.Detail>
                 </Label>

                 <Label style={{marginTop: 4}} color="teal">
                 {t('Completed Tasks')}
                 <Label.Detail>{2}</Label.Detail>
                 </Label>
                 </div> */}
            </div>

            <div style={{padding: 0, paddingTop: 12}}>
                {this.renderGuestlist(guestlist)}
            </div>
        </React.Fragment>)
    }

    renderGuestlist(guestlist) {
        if (!guestlist) return null;

        return (
            <Table style={{marginBottom: 8}} unstackable compact size='small'>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                            <Button onClick={() => this.openCreate()}
                                    floated='right' icon labelPosition='left'
                                    primary size='small'>
                                <Icon name='user'/> {t("Add Guest")}
                            </Button>
                            {/*<Button size='small'>Approve</Button>*/}
                            {/*<Button disabled size='small'>*/}
                            {/*Approve All*/}
                            {/*</Button>*/}
                        </Table.HeaderCell>
                    </Table.Row>

                    <Table.Row >
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>Info</Table.HeaderCell>
                        <Table.HeaderCell>Invited?</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {(!guestlist.guests || guestlist.guests.length < 1) &&
                    <Table.Row>
                        <Table.Cell>No Guests</Table.Cell>
                    </Table.Row>}

                    {guestlist.guests && guestlist.guests.map(g => {
                        let count = 1 +
                            ((_.get(g, "plus.first_name") || _.get(g, "plus.unknown")) ? 1 : 0) +
                            (g.children || []).length
                        ;
                        return (
                            <Table.Row onClick={() => this.editGuest(g)}>
                                {/*<Table.Cell><Checkbox /></Table.Cell>*/}
                                <Table.Cell>{`${_.get(g, "info.first_name")} ${((_.get(g, "info.last_name") || " ")[0] || "").toUpperCase()}`}</Table.Cell>
                                <Table.Cell>{count}</Table.Cell>
                                <Table.Cell>{}</Table.Cell>
                                <Table.Cell>{g.definitely_invited ? 'Definitely' : 'Maybe'}</Table.Cell>
                            </Table.Row>
                        )
                    })}

                </Table.Body>

                <Table.Footer fullWidth>

                </Table.Footer>
            </Table>
        )
    }

    editGuest(guest){
        this.openCreate(guest);
    }

    addChild() {
        const children = (this.state.children || []).slice();
        children.push({});
        this.setState({children});
    }

    removeChildByIndex(index) {
        const children = (this.state.children || []).slice();
        children.splice(index, 1);
        this.setState({children});
    }

    createChangeHandler(field, checkbox) {
        return (e) => {
            const val = checkbox ? e : e.target.value;
            this.setState({
                [field]: val
            })
        }
    }

    editChild(index, field, raw) {
        return (e) => {
            const val = raw ? e : e.target.value;
            const children = (this.state.children || []).slice();
            const child = {...children[index]};
            child[field] = val;
            children[index] = child;
            this.setState({children});
        }
    }

    addPlusOne() {
        this.setState({plus: true});
    }

    removePlus() {
        this.setState({plus: false});
    }

    createGuestTab(tab) {
        return () => {
            this.setState({
                tab,
                children: !this.state.children || this.state.children.length < 1 ? [{}] : this.state.children
            });
        }
    }

    async saveAndNext() {
        const result = await this.save(this.rest, this.state);
        if (result) this.clear();
    }

    async saveAndClose() {
        await this.saveAndNext();
        this.closeCreate()
    }

    cancel() {
        this.clear();
        this.closeCreate();
    }

    clear(replace) {
        if(!replace) replace = {};
        console.log('clear: ', replace)
        this.setState({
            first_name: _.get(replace, "info.first_name") || "",
            last_name: _.get(replace, "info.last_name") || "",
            unknown: _.get(replace, "info.unknown") || false,
            title: replace.title || "",
            plus_first: _.get(replace, "plus.first_name") || "",
            plus_last: _.get(replace, "plus.last_name")  || "",
            plus_unknown: _.get(replace, "plus.unknown")  || false,
            relationship: replace.relationship || "",
            children: replace.children || [],
            plus: _.get(replace, "plus.first_name") || _.get(replace, "plus.last_name") || _.get(replace, "plus.unknown"),
            city: replace.city || "",
            country: replace.country || "",
            street: replace.street || "",
            postal_code: replace.postal_code || "",
            email: replace.email || "",
            mobile: replace.mobile || "",
            id: replace.id || 0,
        });
    }

    closeCreate() {
        this.setState({
            state: 'index'
        });
        this.getGuestlist();
    }

    openCreate(guest = null) {
        this.setState({
            state: 'create',
            guest: guest,
        });


        this.clear(guest);
    }

    tasksThisMonth(tasks) {
        let total = 0;
        let endDate = moment().startOf('month').add(1, 'month').format('YYYY-MM-DD');

        tasks.map((task, index) => {
            if (task.due <= endDate && !task.done) {
                total += 1
            }
        });
        return total;
    }

    async getGuestlist() {
        this.setState({loading: true});
        try {
            let response = await rest.post('guestlist/get');
            console.log('getGL ', response);
            let guestlist = _.get(response, 'guestlist');

            if (!guestlist) throw "";

            this.setState({
                guestlist
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

    async setTaskCompletion(taskIndex) {
        this.setState({loading: true});

        const task = this.state.checklist.tasks[taskIndex];
        console.log('setTaskCompletion', this.state.checklist.tasks, 'idnex: ' + taskIndex, task)
        try {
            let updatedTask = await rest.post('checklist/set_completion', {
                id: task.id,
                done: task.done ? 0 : 1
            });
            updatedTask = _.get(updatedTask, 'task');

            let checklist = {...this.state.checklist};
            checklist.tasks = checklist.tasks.slice();
            checklist.tasks[taskIndex] = updatedTask;
            checklist.tasks[taskIndex]['just_updated'] = true;
            this.setState({
                checklist: checklist
            });
        }
        catch (e) {
            alert("Could not fetch tasks, please try again momentarily")
            console.log(e)
        }
        finally {
            this.setState({loading: false})
        }
    }

    onTaskChecked(taskIndex) {
        return () => {
            this.setTaskCompletion(taskIndex);
        }
    }

    deleteTask(taskIndex) {
        return async () => {
            this.setState({loading: true});

            const task = this.state.checklist.tasks[taskIndex];
            console.log('deleteTask')
            try {
                await rest.post('checklist/remove_task', {
                    id: task.id
                });

                let checklist = {...this.state.checklist};
                checklist.tasks = checklist.tasks.slice();
                checklist.tasks.splice(taskIndex, 1);
                this.setState({
                    checklist: checklist
                });
            }
            catch (e) {
                alert("Could not fetch tasks, please try again momentarily")
                console.log(e)
            }
            finally {
                this.setState({loading: false});
            }
        }
    }

    componentDidMount() {
        if (!this.props.user.token) {
            this.props.history.push('/login')
        }

        this.getGuestlist();
    }
}

export default connect(state => {
    return {
        website: state.website,
        user: state.user
    }
})(withResend(Guestlist))
