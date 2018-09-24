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


export default class TemplateBase extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.slug = props.match.params.id;
        console.log("Website ID: ", this.slug);

        this.rest = rest;
    }

    async componentDidMount() {
        if (!this.slug) {
            // 404
            return;
        }
        const r = await this.rest.get(`get/${this.slug}`);

        if (r && r.website) {
            const action = buildActionForKey(actions.TEMPLATE_RECORD, "website" + this.slug);
            this.props.dispatch(action(r.website));
        }
    }

    render() {
        const website = this.props.templates["website" + this.slug];
        console.log(this.props.templates);
        return (
            <React.Fragment>
                {!website &&
                <div>Loading</div>
                }

                {!!website && (
                    templates.getTemplate(website.template || 1)[this.screenName](website, this.props.match.params.id)
                )}
            </React.Fragment>
        )
    }
}

