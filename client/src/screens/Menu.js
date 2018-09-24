/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Segment, Button, Form, Grid, Input} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const {buildAction, buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleItemClick(page) {

    }

    render() {
        return <div>
            <Grid centered columns={1}>
                <Grid.Column style={{marginTop: 48, maxWidth: 400, textAlign: 'center'}} >
                    <MenuItem to="/">Home</MenuItem>
                    <MenuItem to="/dashboard">Your Website</MenuItem>
                    <MenuItem to="/about">About Us</MenuItem>
                    <MenuItem to="/contact">Contact Us</MenuItem>
                    <MenuItem to="/faq">FAQs</MenuItem>
                    <p onClick={() => this.logout()} style={{ cursor: 'pointer', marginTop: 28, fontSize: 16}}>Logout</p>
                </Grid.Column>
            </Grid>
        </div>
    }

    logout(){
        const action = buildAction(actions.USER_RECORD);
        this.props.dispatch(action({email: "", token: undefined, active: true}));
        this.props.history.push('/login')
    }
}

export default connect(state => {
    return {
        user: state.user
    }
})(Menu)

function MenuItem({children, to}){
    return (<Link to={to}> <p style={{marginTop: 28, fontSize: 16}}>{children}</p></Link>)
}