/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Menu, Segment, Button, Form, Grid, Input} from 'semantic-ui-react'

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

    onTogglePassword(){
        this.setState({showPassword: !this.state.showPassword})
    }

    renderLogin(){
        return (
            <Grid centered columns={1}>
                <Grid.Column style={{marginTop: 48, maxWidth: 400}}>
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input input={this.state.showPassword ? 'input' : 'password'} icon={{ name: 'eye', circular: true, link: true, onClick: this.onTogglePassword }} placeholder='Password' />
                        </Form.Field>
                        <Button style={{marginTop: 28}} fluid primary type='submit'>Log in</Button>

                        <p>Forgot your password?</p>
                    </Form>
                </Grid.Column>
            </Grid>)
    }

    renderRegister(){
        return (
            <Grid centered columns={1}>
                <Grid.Column style={{marginTop: 48, maxWidth: 400}}>
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input type='password' placeholder='Password' />
                        </Form.Field>
                        <Button style={{marginTop: 28}} fluid primary type='submit'>Sign up for free</Button>
                    </Form>
                </Grid.Column>
            </Grid>)
    }

    render() {
        return <div>
            <Menu compact pointing secondary>
                <Menu.Item name='Log in' active={this.state.page === 'login'}
                           onClick={this.handleItemClick.bind(this, 'login')}/>
                <Menu.Item name='Sign up' active={this.state.page === 'register'}
                           onClick={this.handleItemClick.bind(this, 'register')}/>
            </Menu>

            {this.state.page === 'login' ? this.renderLogin() : this.renderRegister()}
        </div>
    }
}
