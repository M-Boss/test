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

module.exports = router;