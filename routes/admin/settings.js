const express = require('express');
const router = express.Router();
const container = require('../../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');
const {templateList} = require('../../client/src/screens/templates/templateList');



router.post('/settings', async function (req, res, next) {
    const db = container.get('db');
    const users = container.get('users');
    const settings = container.get('settings');

    try {
        const preview_user = parseInt(_.get(req, 'body.preview_user'));
        await settings.set('preview_user', preview_user);
        res.redirect('/boss/settings');
    }
    catch (e){
        console.log(e);
        res.json(e);
    }
});

router.get('/settings', async function (req, res, next) {
    const db = container.get('db');
    const users = container.get('users');
    const settings = container.get('settings');

    try {
        const userList = await users.find(null, [['id','DESC']]);
        const config = {
            preview_user: await settings.get('preview_user')
        };
        res.render('admin/settings', {config, users: userList});
    }
    catch (e){
        console.log(e);
        res.json(e);
    }
});

module.exports = router;