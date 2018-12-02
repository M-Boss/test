const express = require('express');
const router = express.Router();
const container = require('../../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');
const {templateList} = require('../../client/src/screens/templates/templateList');

router.get('/users', async function (req, res, next) {
    const db = container.get('db');
    const users = container.get('users');
    const userList = await users.find(null, [['id', 'DESC']]);

    try {
        res.render('admin/users', {users: userList});
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
});

router.get('/users/:id', async function (req, res, next) {
    const db = container.get('db');
    const users = container.get('users');

    try {
        const id = _.get(req, 'params.id');
        res.render('admin/user', {user: await users.findOne({id: id})});
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
});

router.post('/users/:id', async function (req, res, next) {
    const db = container.get('db');
    const users = container.get('users');

    try {
        const id = _.get(req, 'params.id');
        const is_template_user = parseInt(_.get(req, 'body.is_template_user', 0));
        const active = parseInt(_.get(req, 'body.active', 1));
        const slug = _.get(req, 'body.slug', "");
        const user = await users.findOne({id});
        if (user) {
            user.is_template_user = is_template_user;
            user.slug = slug;
            if(user.website) {
                user.website = {...user.website, ...{url: await users.buildWebsiteURL(slug)}};
                console.log('here');
            }
            user.active = active;
            await user.save();
        }
        res.redirect('/boss/users/' + id);
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
});

module.exports = router;