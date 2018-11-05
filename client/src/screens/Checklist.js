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
            loading: false
        };
        this.rest = rest;

        this.onTaskChecked = this.onTaskChecked.bind(this);
    }

    render() {
        /*const tasks = [
            {
                id: -4,
                title: "Create an inspiration board and be prepared to share it with vendors",
                description: "Create  board and an  be prepared to share it with vendors, Create an inspiration board and be prepared to share!",
                notes: "Hey there!",
                category: 'general',
                due: '2017-11-22',
                done: null,
            },
            {
                id: 1,
                title: "Create an inspiration board and be prepared to share it with vendors",
                description: "Create  board and an  be prepared to share it with vendors, Create an inspiration board and be prepared to share!",
                notes: "Hey there!",
                category: 'general',
                due: '2018-12-22',
                done: null,
            },
            {
                id: 2,
                title: "An inspiration board and be prepared to share it with vendors",
                description: "Board and an  be prepared to share it with vendors, Create an inspiration board and be prepared to share!",
                notes: "Hey there!",
                category: 'muslim',
                due: '2019-01-04',
                done: null,
            },
            {
                id: 3,
                title: "An inspiration board and be prepared to share it with vendors",
                description: "Board and an  be prepared to share it with vendors, Create an inspiration board and be prepared to share!",
                notes: "Hey there!",
                category: 'muslim',
                due: '2019-01-05',
                done: '2018-09-04',
            }
        ];*/

        const tasks = _.get(this.state, 'checklist.tasks', []) || [];

        return (
            <React.Fragment>
                <Header />

                <div className="checklist" style={{backgroundColor: '#F4F7F9'}}>
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
                                <Button primary>{t("New Task")}</Button>
                                <Button>{t("Edit Settings")}</Button>
                            </div>
                        </div>

                        <div>
                            <div style={{marginTop: 35}}/>

                            <Label color="teal">
                                {t('Days Left')}
                                <Label.Detail>214</Label.Detail>
                            </Label>

                            <Label color="teal">
                                {t('Tasks This Month')}
                                <Label.Detail>24</Label.Detail>
                            </Label>

                            <Label style={{marginTop: 4}} color="teal">
                                {t('Completed Tasks')}
                                <Label.Detail>24</Label.Detail>
                            </Label>
                        </div>
                    </div>
                    <div style={{padding: 0, paddingTop: 12}}>
                        <div style={{backgroundColor: '#FFF', padding: 4, paddingTop: 12, borderTop: '2px solid #DDD', borderBottom: '2px solid #DDD', marginTop: 0, marginBottom: 10}}>
                            {this.renderTasks(tasks)}
                        </div>
                    </div>
                </div>

                <Footer/>
            </React.Fragment>
        )
    }

    async getChecklist(){
        this.setState({loading: true});
        try {
            let checklist = await rest.post('checklist/get');
            checklist = _.get(checklist, 'checklist');
            this.setState({checklist});
            console.log(checklist);
        }
        catch(e){
            alert("Could not fetch tasks, please try again momentarily")
        }
        finally{

        }
    }

    async setTaskCompletion(taskIndex){
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
        catch(e){
            alert("Could not fetch tasks, please try again momentarily")
            console.log(e)
        }
        finally{

        }
    }

    renderTasks(tasks) {
        //.format('YYYY-MM-DD');
        let endDate = moment().startOf('month').add(1, 'month');
        let thisMonth = moment().startOf('month').format('YYYY-MM-DD');
        let today = moment().format('YYYY-MM-DD');
        let newMonth = true;
        let overdue = true;

        console.log('renderTasks: ', tasks)

        return tasks.map((task, index) => {
            while (task.due >= endDate.format('YYYY-MM-DD')) {
                endDate.add(1, 'month');
                newMonth = true;
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
                    <Row checked={!!task.done} onChange={this.onTaskChecked(index)} label={task.title}
                         date={moment(task.due, 'YYYY-MM-DD').format('MMM D, YYYY')} overdue={overdue && !task.done}/>
                </React.Fragment>
            )
        })
    }

    onTaskChecked(taskIndex){
        return () => {
            this.setTaskCompletion(taskIndex);
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
function Row({label, date, overdue, onChange, checked}) {
    return (
        <div style={{display: 'flex', alignItems: 'center', paddingTop: 12, paddingBottom: 12}}>
            <Checkbox checked={checked} onChange={onChange} />
            <div style={{flex: 1, paddingLeft: 4,}}>{label}</div>
            <div style={{color: overdue ? '#c7133e' : '#888', paddingLeft: 8}}>{date}</div>
            <div style={{paddingLeft: 6}}><Icon style={{color: '#999'}} name='trash'/></div>
        </div>
    )
}

export default connect(state => {
    return {
        website: state.website,
        user: state.user
    }
})(withResend(Checklist))
