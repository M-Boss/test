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

class Checklist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            state: 'index',
            taskTitle: '',
            taskDescription: '',
            taskDue: '',
            taskNotes: '',
            taskId: 0,
            weddingDate: '',
            weddingTraditions: []
        };
        this.rest = rest;

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

                {this.state.checklist &&
                <div className="checklist" style={{backgroundColor: '#F4F7F9'}}>
                    {this.state.state === 'creatingTask' && this.renderCreateTask()}
                    {this.state.state === 'index' && this.state.checklist.initialized != 0 && this.renderContent(tasks)}
                    {this.state.state === 'settings' && this.renderSettings()}
                </div>}

                <Footer/>
            </React.Fragment>
        )
    }

    renderCreateTask() {
        console.log('renderCreateTask: ', this.state);
        return (
            <div style={{padding: 24, paddingTop: 10, position: 'relative'}}>
                <div className="pointer" onClick={() => this.closeCreateTask()}
                     style={{position: 'absolute', right: 12, top: 24, width: 40, height: 40}}>
                    <Icon name="close" style={{fontSize: 24}}/>
                </div>

                <H2>{t("Add Task")}</H2>
                <InputCombo disabled={_.get(this.state, 'task.category')}
                            onChange={this.createTaskChangeHandler('taskTitle')} value={this.state.taskTitle}
                            label={t("Title")}/>

                {_.get(this.state, 'task.category') ?
                    <p style={{paddingTop: 10, marginBottom: 32}}>{this.state.task.description}</p> : null }

                <DateInput style={{marginTop: 12}}
                           label={t("Due Date")}
                           selected={this.state.taskDue ? moment(this.state.taskDue) : null}
                           onChange={date => {
                               // console.log(date);
                               this.createTaskChangeHandler('taskDue', true)(date ? date.format('YYYY-MM-DD') : "2019-01-01")
                           }}/>
                <Form>

                    <InputLabel>{t("Notes")}</InputLabel>
                    <TextArea onChange={this.createTaskChangeHandler('taskNotes')}
                              value={this.state.taskNotes}/>
                </Form>

                <br/>
                <br/>
                <Button onClick={this.saveTask} primary>{t("Save")}</Button>
                <Button onClick={() => this.closeCreateTask()}>{t("Cancel")}</Button>
            </div>
        )
    }

    renderSettings() {
        const culturs = ['muslim', 'christian', 'catholic', 'cina'];

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

    createTaskChangeHandler(field, checkbox) {
        return (e) => {
            const val = checkbox ? e : e.target.value;
            this.setState({
                [field]: val
            })
        }
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

            checklist.tasks.sort((a, b) => a.due < b.due ? -1 : 1)

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
                        <div style={{ color: '#888', backgroundColor: 'rgba(65,65,66,.05)'}}>
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

        this.getChecklist();
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
})(withResend(Checklist))
