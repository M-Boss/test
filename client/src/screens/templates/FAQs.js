/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import rest  from '../../services/external/rest';
import TemplateBase from './TemplateBase'
const {buildAction, buildActionForKey} = require('../../services/internal/store/DefaultReducer');
const actions = require('../../services/internal/store/actionConstants');
const templates = require('./index');



class FAQs extends TemplateBase{

    constructor(props){
        super(props);
        this.screenName = "faqs";
    }
}

export default connect(state => {
    return {
        user: state.user,
        templates: state.templates
    }
})(FAQs)