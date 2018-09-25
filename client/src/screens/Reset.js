/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Menu, Segment, Button, Form, Grid, Input} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Footer from "./Footer";
import Header from "./Header";
import rest from '../services/external/rest'
const {buildActionForKey, buildAction} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
const {connect} = require('react-redux');

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            loading: false,
            sent: false
        };

        this.id = props.match.params.id;
        this.token = props.match.params.token;
        // this.onTogglePassword = this.onTogglePassword.bind(this);
    }

    componentDidMount() {
        // if(this.props.user.token){
        //     this.props.history.push('/create')
        // }
    }

    recover() {
        this.setState({loading: true});
        rest.post('auth/reset', {
            id: this.id,
            token: this.token,
            password: this.state.password
        })
            .then(r => {
                this.setState({
                    sent: true
                })
            })
            .catch(e => {
                alert("Please try again in a few minutes")
            })
            .finally(() => {
                this.setState({loading: false});
            })
    }

    render() {
        return (
            <React.Fragment>
                <Header />

                <div style={{padding: 24}}>
                    {!this.state.sent && <Form >
                        <p>Enter a new password to reset your old one.</p>
                        <Form.Field>
                            <label>New password</label>
                            <input value={this.state.password} onChange={e => this.setState({password: e.target.value})}
                                   placeholder='Password'/>
                        </Form.Field>
                        <Button onClick={() => this.recover()} loading={this.state.loading} style={{marginTop: 28}}
                                fluid primary type='submit'>Set new password</Button>
                    </Form>}

                    {this.state.sent && <div>
                        <p>Your password was reset.</p>
                        <Link to="/login">Back to login screen</Link>
                    </div>}
                </div>

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