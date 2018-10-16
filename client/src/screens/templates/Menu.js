/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import rest  from '../../services/external/rest';
import TemplateBase from './TemplateBase'
import Menu_ from './Menu_'
const {buildAction, buildActionForKey} = require('../../services/internal/store/DefaultReducer');
const actions = require('../../services/internal/store/actionConstants');
const templates = require('./index');

class Menu extends TemplateBase{

    constructor(props){
        super(props);
        this.screenName = "menu";
    }
    //
    // render(){
    //     const website = this.props.templates["website" + this.getSlug()];
    //     const websiteId = this.props.match.params.id;
    //
    //     return (
    //         <Menu_ website={website} websiteId={websiteId} />
    //     )
    // }
}

export default connect(state => {
    return {
        user: state.user,
        templates: state.templates
    }
})(Menu)
