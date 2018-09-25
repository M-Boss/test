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
const {connect} = require('react-redux')

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false,
            sent: false
        };

        // this.id = props.match.params.id;
        // this.token = props.match.params.token;

        // this.onTogglePassword = this.onTogglePassword.bind(this);
    }

    componentDidMount() {
        // if(this.props.user.token){
        //     this.props.history.push('/create')
        // }
    }

    recover() {
        let email = this.state.email;
        this.setState({loading: true});
        rest.post('auth/recover', {email})
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
                        <p>Enter your email and we will send you a password recovery link: </p>
                        <Form.Field>
                            <label>Email</label>
                            <input value={this.state.email} onChange={e => this.setState({email: e.target.value})}
                                   placeholder='Email'/>
                        </Form.Field>
                        <Button onClick={() => this.recover()} loading={this.state.loading} style={{marginTop: 28}}
                                fluid primary type='submit'>Email password reset link</Button>
                    </Form>}

                    {this.state.sent && <div>
                        <p>We've sent you an email containing the instructions to reset your password.</p>
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