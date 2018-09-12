/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Menu, Segment, Button, Form, Grid, Input} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Footer from "./Footer";
import rest from '../services/external/rest'
const {buildActionForKey, buildAction} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
const {connect} = require('react-redux')

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 'login',
            showPassword: false,
            register_password: "",
            register_email: "",
            login_password: "",
            login_email: "",
            loading: false
        };

        this.onTogglePassword = this.onTogglePassword.bind(this);
    }

    handleItemClick(page) {
        this.setState({page});
        console.log(this.state);
    }

    onTogglePassword() {
        this.setState({showPassword: !this.state.showPassword})
    }

    login(){
        let email = this.state.login_email;
        const password = this.state.login_password;
        this.setState({loading: true});
        rest.post('auth/login', {email, password})
            .then(r => {
                const websiteAction = buildAction(actions.WEBSITE_RECORD);
                const userAction = buildAction(actions.USER_RECORD);

                this.props.dispatch(websiteAction(r.user.website));
                this.props.dispatch(userAction({
                    email: r.user.email,
                    token: r.user.token
                }));

                this.props.history.push('/create')
            })
            .catch(e => {
                alert("Wrong credentials")
            })
            .finally(() => {
                this.setState({loading: false});
            })
    }

    register(){
        let email = this.state.register_email;
        const password = this.state.register_password;
        this.setState({loading: true});
        rest.post('auth/register', {email, password})
            .then(r => {
                const user = r.user;
                const websiteAction = buildAction(actions.WEBSITE_RECORD);
                const userAction = buildAction(actions.USER_RECORD);

                this.props.dispatch(websiteAction(r.user.website));
                this.props.dispatch(userAction({
                    email: r.user.email,
                    token: r.user.token
                }));

                this.props.history.push('/welcome')
            })
            .catch(e => {
                console.log(e);
                alert("Invalid or duplicate credentials")
            })
            .finally(() => {
                this.setState({loading: false});
            })
    }

    renderLogin() {
        return (

            <Form>
                <Form.Field>
                    <label>Email</label>
                    <input value={this.state.login_email} onChange={e => this.setState({login_email: e.target.value})} placeholder='Email'/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input value={this.state.login_password} onChange={e => this.setState({login_password: e.target.value})} input={this.state.showPassword ? 'input' : 'password'}
                           icon={{name: 'eye', circular: true, link: true, onClick: this.onTogglePassword}}
                           placeholder='Password'/>
                </Form.Field>
                <Button onClick={() => this.login()} loading={this.state.loading} style={{marginTop: 28}} fluid primary type='submit'>Log in</Button>

                <p style={{marginTop: 40, textAlign: 'center'}}>Forgot your password?</p>
            </Form>
        )
    }

    renderRegister() {
        return (
            <Form>
                <Form.Field>
                    <label>Email</label>
                    <input value={this.state.register_email} onChange={e => this.setState({register_email: e.target.value})} placeholder='Email'/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input value={this.state.register_password} onChange={e => this.setState({register_password: e.target.value})}  type='password' placeholder='Password'/>
                </Form.Field>
                <Button onClick={() => this.register()} loading={this.state.loading} style={{marginTop: 28}} fluid primary type='submit'>Sign up for free</Button>
            </Form>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div style={{textAlign: 'center', marginBottom: 32, marginTop: 20}}>
                    <Menu pointing secondary compact>
                        <Menu.Item name='Log in' active={this.state.page === 'login'}
                                   onClick={this.handleItemClick.bind(this, 'login')}/>
                        <Menu.Item name='Sign up' active={this.state.page === 'register'}
                                   onClick={this.handleItemClick.bind(this, 'register')}/>
                    </Menu>
                </div>
                {
                    this.state.page === 'login' ? this.renderLogin() : this.renderRegister()
                }
                <br/>
                <br/>
                <br/>
                <Footer/>

            </React.Fragment>
        )
    }
}

export default connect(state => {
    return {
        website: state.website,
        user: state.user
    }
})(Login)