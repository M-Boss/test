const express = require('express');
const router = express.Router();
const container = require('../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');

router.post('/user/resend',  async function (req, res, next) {
    const users = container.get('users');
    const mailer = container.get('mailer');
    const config = container.get('config');

    try {
        users.sendVerificationEmail(req.user);
        res.send({r: 'ok'});
    }
    catch (e){
        console.log('sendVerificationEmail error', e);
        res.sendStatus(723); //probably duplicate email
    }
});

router.post('/user/authenticate', async function (req, res, next) {
    try {
        res.send({r: 'ok', user: req.user});
    }
    catch (e){
        res.sendStatus(729);
    }
});

router.post('/user/update-info', async function (req, res, next) {
    try {
        const cleaner = container.get('cleaner');
        const first_name = _.get(req, 'body.first_name');
        const last_name = _.get(req, 'body.last_name');
        const phone = _.get(req, 'body.phone');
        const email = (_.get(req, 'body.email') + "").toLowerCase();
        const currentEmail = (_.get(req, 'user.email') + "").toLowerCase();

        req.user.first_name = cleaner.clean(first_name);
        req.user.last_name = cleaner.clean(last_name);
        req.user.phone = cleaner.clean(phone);
        if(email !== currentEmail){
            req.user.email = email;
        }
        await req.user.save();
        res.send({r: 'ok', user: req.user});
    }
    catch (e){
        res.sendStatus(729);
    }
});

router.post('/user/change-password', async function (req, res, next) {
    try {
        const users = container.get('users');
        const password = _.get(req, 'body.new_password');
        console.log(password);
        const result = await users.resetPasswordByUser(req.user, password);
        res.send({r: 'ok', user: req.user});
    }
    catch (e){
        console.log(e);
        res.sendStatus(729);
    }
});

module.exports = router;