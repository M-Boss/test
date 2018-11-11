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
    Accordion
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
            state: 'create', //index, create
            tab: 'single', // createGuestTab: single, family
            plus: false,
            children: []
        };
        this.rest = rest;
        this.addChild = this.addChild.bind(this);
        this.removeChildByIndex = this.removeChildByIndex.bind(this);
        this.addPlusOne = this.addPlusOne.bind(this);
        this.removePlus = this.removePlus.bind(this);

        this.onTaskChecked = this.onTaskChecked.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.saveTask = this.saveTask.bind(this);
    }

    render() {
        const tasks = _.get(this.state, 'checklist.tasks', []) || [];

        console.log('render: state: ', this.state);
        return (
            <React.Fragment>
                <Header />

                {true &&
                <div className="checklist" style={{backgroundColor: '#F4F7F9'}}>
                    {this.state.state === 'create' && this.renderCreate()}

                    {this.state.state === 'index' && this.state.checklist.initialized != 0 && this.renderContent(tasks)}
                    {this.state.state === 'settings' && this.renderSettings()}
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
                <div className="pointer" onClick={() => this.closeCreateTask()}
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

                        {this.state.plus && <div style={{ borderLeft: '2px solid teal', paddingLeft: 8, marginTop: 16, marginBottom: 16, paddingTop: 8, paddingBottom: 8, borderTop: '1px solid #f2f2f2', borderBottom: '1px solid #f2f2f2'}} >
                            <div style={{paddingBottom: 12, display: 'flex', alignItems: 'center'}}>
                                <label style={{fontWeight: '700', flex: 1}}>{t("Plus One")}</label>
                                <div onClick={this.removePlus} className="pointer" style={{padding: 4}}>
                                    <Icon name='close' size={16} />
                                </div>
                            </div>
                            <Checkbox style={{marginBottom: 10}} label={t("Name Unknown")} onChange={(e, {checked}) => this.createChangeHandler('plus_unknown', true)(checked)}
                                      toggle checked={this.state.plus_unknown}/>

                            <Form.Select
                                disabled={this.state.plus_unknown}
                                onChange={(e, {value}) => this.createChangeHandler('plus_title', true)(value)}
                                value={this.state.plus_title}
                                fluid label={t("Title")} options={titles} />

                            <InputCombo disabled={this.state.plus_unknown} style={{marginTop: 4}} onChange={this.createChangeHandler('plus_first_name')}
                                        value={this.state.plus_first_name}
                                        label={t("First Name")} />

                            <InputCombo disabled={this.state.plus_unknown} style={{marginTop: 8}} onChange={this.createChangeHandler('plus_last_name')}
                                        value={this.state.plus_last_name}
                                        optional
                                        label={t("Last Name")} />
                        </div>}

                        {this.state.children && this.state.children.map && this.state.children.map((c, index) => {
                            return (
                                <div style={{ borderLeft: '2px solid teal', paddingLeft: 8, marginTop: 16, marginBottom: 16, paddingTop: 8, paddingBottom: 8, borderTop: '1px solid #f2f2f2', borderBottom: '1px solid #f2f2f2'}} >
                                    <div style={{paddingBottom: 12, display: 'flex', alignItems: 'center'}}>
                                        <label style={{fontWeight: '700', flex: 1}}>{t("Child") + ' ' + (index+1)}</label>
                                        <div onClick={() => this.removeChildByIndex(index)} className="pointer" style={{padding: 4}}>
                                            <Icon name='close' size={16} />
                                        </div>
                                    </div>
                                    <Checkbox style={{marginBottom: 10}} label={t("Name Unknown")}
                                              onChange={(e, {checked}) => this.editChild(index, 'unknown', true)(checked)}
                                              toggle checked={c.unknown}/>

                                    <InputCombo disabled={c.unknown} style={{marginTop: 4}}
                                                onChange={this.editChild(index, 'first_name')}
                                                value={c.first_name}
                                                label={t("First Name")} />

                                    <InputCombo disabled={c.unknown} style={{marginTop: 8}}
                                                onChange={this.editChild(index, 'last_name')}
                                                value={c.last_name}
                                                optional
                                                label={t("Last Name")} />
                                </div>
                            )
                        })}

                        {<div className="pointer" style={{
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

                        <Accordion style={{marginTop: 32}}  defaultActiveIndex={[]}
                                   panels={panels} exclusive={false} fluid/>


                    </Form>
                </Segment>

                <br/>
                <br/>
                <Button onClick={this.saveTask} primary>{t("Save")}</Button>
                <Button onClick={() => this.closeCreateTask()}>{t("Cancel")}</Button>
            </div>
        )
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

    editChild(index, field, raw){
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

    removePlus(){
        this.setState({plus: false});
    }

    createGuestTab(tab) {
        return () => {
            this.setState({tab});
        }
    }

    createChangeHandler(field, checkbox) {
        return (e) => {
            const val = checkbox ? e : e.target.value;
            this.setState({
                [field]: val
            })
        }
    }


    renderSettings() {
        const culturs = ['muslim', 'christian', 'catholic', 'chinese'];

        return (
            <div style={{padding: 24, paddingTop: 10, position: 'relative'}}>
                {this.state.checklist.initialized ? <div className="pointer" onClick={() => this.closeCreateTask()}
                                                         style={{
                                                             position: 'absolute',
                                                             right: 12,
                                                             top: 24,
                                                             width: 40,
                                                             height: 40
                                                         }}>
                    <Icon name="close" style={{fontSize: 24}}/>
                </div> : null}

                <H2>Checklist Settings</H2>
                <DateInput style={{marginTop: 12}}
                           label={t("Wedding Date")}
                           selected={this.state.weddingDate ? moment(this.state.weddingDate) : null}
                           onChange={date => {
                               // console.log(date);
                               this.createTaskChangeHandler('weddingDate', true)(date ? date.format('YYYY-MM-DD') : "")
                           }}/>

                <br/>
                <InputLabel>{t("Are You Including Any Cultural Or Religious Traditions In Your Ceremony?")}</InputLabel>
                {culturs.map(c => {
                    return (
                        <div style={{padding: 5}}>
                            <Checkbox checked={this.state.weddingTraditions.includes(c)}
                                      onChange={this.toggleTradition(c)} label={t(`culturs.${c}`)}/>
                        </div>
                    )
                })}

                <br/>
                <br/>
                <Button disabled={this.state.loading} onClick={this.saveSettings} primary>{t("Save")}</Button>
                {this.state.checklist.initialized ?
                    <Button onClick={() => this.closeCreateTask()}>{t("Cancel")}</Button> : null}
            </div>
        )
    }

    toggleTradition(tradition) {
        return () => {
            const index = this.state.weddingTraditions.indexOf(tradition);
            const updated = this.state.weddingTraditions.slice();
            if (index != -1) {
                updated.splice(index, 1);
            }
            else {
                updated.push(tradition)
            }

            this.setState({
                weddingTraditions: updated
            })
        }
    }

    async saveSettings() {

        console.log(this.state);
        if (!this.state.weddingDate) {
            return alert(t("Please enter all required fields"))
        }
        this.setState({loading: true});

        try {
            let body = {
                weddingDate: this.state.weddingDate,
                traditions: this.state.weddingTraditions
            };

            await rest.post('checklist/settings', body);
            this.closeCreateTask();
        }
        catch (e) {
            alert("Please try again momentarily");
            console.log(e)
        }
        finally {
            this.setState({loading: false});
        }
    }

    async saveTask() {

        if (!this.state.taskDue || !this.state.taskTitle) {
            return alert(t("Please enter all required fields"))
        }

        this.setState({loading: true});

        try {
            let body = {
                id: this.state.taskId,
                title: this.state.taskTitle,
                description: this.state.taskDescription,
                due: this.state.taskDue,
                notes: this.state.taskNotes
            };

            console.log('body: ', body)

            if (this.state.taskId) {
                await rest.post('checklist/update_task', body);
            }
            else {
                await rest.post('checklist/add_task', body);
            }

            this.closeCreateTask();
        }
        catch (e) {
            alert("Please try again momentarily");
            console.log(e)
        }
        finally {
            this.setState({loading: false});
        }
    }

    closeCreateTask() {
        this.setState({
            taskTitle: '',
            taskDescription: "",
            taskDue: "",
            taskId: 0,
            state: 'index'
        });

        this.getChecklist();
    }

    openCreateTask(task = null) {
        this.setState({
            taskTitle: task ? task.title : '',
            taskDescription: task ? task.description : "",
            taskNotes: task ? task.notes : "",
            taskDue: task ? task.due : "",
            taskId: task ? task.id : 0,
            state: 'creatingTask',
            task: task
        })
    }

    openSettings() {
        this.setState({
            state: 'settings',
            weddingDate: _.get(this.state, 'user.wedding_date') || '',
            weddingTraditions: _.get(this.state, 'checklist.traditions') || [],
        })
    }

    renderContent(tasks) {
        const weddingDate = moment(this.state.user.wedding_date, 'YYYY-MM-DD');
        const daysLeft = Math.ceil(moment.duration(weddingDate.diff(moment())).asDays());
        const completedTasks = tasks.reduce((total, t) => t.done ? total + 1 : total, 0);

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
                        }}>{t("Wedding Checklist")}</H2>
                    </div>

                    <div className="responsive-half desktop-right">
                        <Button onClick={() => this.openCreateTask()} primary>{t("Add Task")}</Button>
                        <Button onClick={() => this.openSettings()}>{t("Edit Settings")}</Button>
                    </div>
                </div>

                <div>
                    <div style={{marginTop: 35}}/>

                    <Label color="teal">
                        {t('Days Left')}
                        <Label.Detail>{daysLeft}</Label.Detail>
                    </Label>

                    <Label color="teal">
                        {t('Tasks This Month')}
                        <Label.Detail>{this.tasksThisMonth(tasks)}</Label.Detail>
                    </Label>

                    <Label style={{marginTop: 4}} color="teal">
                        {t('Completed Tasks')}
                        <Label.Detail>{completedTasks}</Label.Detail>
                    </Label>
                </div>
            </div>
            <div style={{padding: 0, paddingTop: 12}}>
                <div style={{
                    backgroundColor: '#FFF',
                    padding: 4,
                    paddingTop: 12,
                    borderTop: '2px solid #DDD',
                    borderBottom: '2px solid #DDD',
                    marginTop: 0,
                    marginBottom: 10
                }}>
                    {this.renderTasks(tasks)}
                </div>
            </div>
        </React.Fragment>)
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

    async getChecklist() {
        this.setState({loading: true});
        try {
            let response = await rest.post('checklist/get');
            console.log('getCheL ', response);
            let checklist = _.get(response, 'checklist');
            let user = _.get(response, 'user');
            if (!checklist) throw "";

            if (checklist.tasks) {
                checklist.tasks.sort((a, b) => a.due < b.due ? -1 : 1)
            }

            this.setState({
                checklist,
                user
            });

            if (!checklist.initialized) {
                this.openSettings();
            }
        }
        catch (e) {
            alert("Could not fetch tasks, please try again momentarily")
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

    renderTasks(tasks) {
        //.format('YYYY-MM-DD');
        let endDate = moment().startOf('month').add(1, 'month');
        let thisMonth = moment().startOf('month').format('YYYY-MM-DD');
        let today = moment().format('YYYY-MM-DD');
        let newMonth = true;
        let overdue = true;

        const completed = [];
        return (
            <React.Fragment>
                {tasks.map((task, index) => {
                    while (task.due >= endDate.format('YYYY-MM-DD')) {
                        endDate.add(1, 'month');
                        newMonth = true;
                    }

                    if (task.done && !task.just_updated) {
                        completed.push(task);
                        return null;
                    }

                    let ribbon = null;
                    if (newMonth) {
                        const taskMonth = moment(endDate).add(-1, 'month');
                        const label = taskMonth.format('YYYY-MM-DD') === thisMonth ?
                            `This Month (${taskMonth.format('MMMM YYYY')})` :
                            taskMonth.format('MMMM YYYY');
                        ribbon = <Ribbon first={true} label={label}/>;
                        newMonth = false;
                    }

                    if (overdue) {
                        if (task.due >= today) {
                            overdue = false
                        }
                    }

                    return (
                        <React.Fragment>
                            {ribbon}
                            <Row onLabelClicked={() => this.openCreateTask(task)}
                                 task={task}
                                 deleteTask={this.deleteTask(index)} checked={!!task.done}
                                 onChange={this.onTaskChecked(index)}
                                 label={task.title}
                                 date={moment(task.due, 'YYYY-MM-DD').format('MMM D, YYYY')}
                                 overdue={overdue && !task.done}/>
                        </React.Fragment>
                    )
                })}

                {completed.length > 0 && <Ribbon label={t("Completed")}/>}
                {tasks.map((task, index) => {
                    if (!task.done || task.just_updated) {
                        return null;
                    }

                    return (
                        <div style={{color: '#888', backgroundColor: 'rgba(65,65,66,.05)'}}>
                            <Row onLabelClicked={() => this.openCreateTask(task)}
                                 task={task}
                                 deleteTask={this.deleteTask(index)} checked={!!task.done}
                                 onChange={this.onTaskChecked(index)}
                                 label={task.title}
                                 date={'@' + moment(task.done, 'YYYY-MM-DD').format('MMM D, YYYY')}
                                 overdue={overdue && !task.done}/>
                        </div>
                    )
                })}
            </React.Fragment>
        )


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

        //this.getChecklist();
    }
}

function Ribbon({label, first}) {
    return (
        <div style={{marginTop: first ? 8 : 16, paddingBottom: 8, marginBottom: 0,}}>
            <Label as='a' color='teal' ribbon>{label}</Label>
        </div>
    )
}
function Row({label, onLabelClicked, date, task, overdue, onChange, checked, deleteTask}) {
    return (
        <div style={{display: 'flex', alignItems: 'center', paddingTop: 12, paddingBottom: 12}}>
            <Checkbox checked={checked} onChange={onChange}/>
            <div onClick={onLabelClicked}
                 style={{flex: 1, paddingLeft: 4, textDecoration: checked ? 'line-through' : ''}}>
                {label} &nbsp;
                {task.category && task.category !== 'general' ? <Label style={{padding: 3}} color="olive">
                    { t(`culturs.${task.category}`)}
                </Label> : null}
            </div>
            <div style={{color: overdue ? '#c7133e' : '#888', paddingLeft: 8}}>{date}</div>
            <div onClick={deleteTask} style={{paddingLeft: 6}}><Icon style={{color: '#999'}} name='trash'/></div>
        </div>
    )
}

export default connect(state => {
    return {
        website: state.website,
        user: state.user
    }
})(withResend(Guestlist))
