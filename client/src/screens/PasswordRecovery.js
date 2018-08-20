/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Menu, Segment, Button, Form, Grid, Input} from 'semantic-ui-react'

export default class PasswordRecovery extends Component {


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
                <Grid.Column style={{marginTop: 48, maxWidth: 400}}>
                    <Form>
                        <Form.Field>
                            <label>Enter your email address here.A password reset link will be sent this address:</label>
                            <input placeholder='Email'/>

                            <Button style={{marginTop: 28}} fluid primary type='submit'>Recover password</Button>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    }
}
