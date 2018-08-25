/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Menu, Segment, Button, Form, Grid, Input} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Footer from "./Footer";
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 'login',
            showPassword: false
        };

        this.onTogglePassword = this.onTogglePassword.bind(this);
    }

    handleItemClick(page) {
        this.setState({page})
        console.log(this.state);
    }

    onTogglePassword() {
        this.setState({showPassword: !this.state.showPassword})
    }

    renderLogin() {
        return (

            <Form>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email'/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input input={this.state.showPassword ? 'input' : 'password'}
                           icon={{name: 'eye', circular: true, link: true, onClick: this.onTogglePassword}}
                           placeholder='Password'/>
                </Form.Field>
                <Link to="/welcome"><Button style={{marginTop: 28}} fluid primary type='submit'>Log in</Button></Link>

                <p style={{marginTop: 40, textAlign: 'center'}}>Forgot your password?</p>
            </Form>
        )
    }

    renderRegister() {
        return (
            <Form>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email'/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input type='password' placeholder='Password'/>
                </Form.Field>
                <Link to="/welcome"><Button style={{marginTop: 28}} fluid primary type='submit'>Sign up for free</Button></Link>
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
