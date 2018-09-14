/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import rest  from '../../services/external/rest';
const {buildAction, buildActionForKey} = require('../../services/internal/store/DefaultReducer');
const actions = require('../../services/internal/store/actionConstants');
const templates = require('./index');


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        const last = props.match.params.id;
        this.websiteId = parseInt(last.split("-")[0]);
        console.log("Website ID: ", this.websiteId);

        this.rest = rest;
        console.log(this.rest.get);
    }

    async componentDidMount() {

        const r = await this.rest.get(`get/${this.websiteId}`);
        if (!this.websiteId) {
            // 404
            return;
        }

        if (r && r.website) {
            const action = buildActionForKey(actions.TEMPLATE_RECORD, "website" + this.websiteId);
            this.props.dispatch(action(r.website));
        }
    }

    render() {
        const website = this.props.templates["website" + this.websiteId];
        console.log(this.props.templates)
        return (
            <React.Fragment>
                {!website &&
                <div>Loading</div>
                }

                {!!website && (
                    templates.getTemplate(website.template).home(website)
                )}
            </React.Fragment>
        )
    }
}


export default connect(state => {
    return {
        user: state.user,
        templates: state.templates
    }
})(Home)