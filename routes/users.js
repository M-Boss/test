const express = require('express');
const router = express.Router();
const container = require('../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');

const registerValidation = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{1,30}/).required()
    }
};

router.post('/auth/register', validate(registerValidation), async function (req, res, next) {
    const users = container.get('users');
    try {
        const user = await users.create({...req.body});
        res.send({user});
    }
    catch (e){
        console.log(e);
        res.sendStatus(704); //probably duplicate email
    }
});

router.post('/auth/login', validate(registerValidation), async function (req, res, next) {
    const users = container.get('users');
    try{
        let user = await users.login({...req.body});
        res.send({user});
    }
    catch (e){
        console.log(e);
        res.sendStatus(400);
    }
});
//
// router.post('/auth/recover-email', async function (req, res, next) {
//     const users = container.get('users');
//     try{
//         let result = await users.recoverPassword({...req.body});
//         res.send({});
//     }
//     catch (e){
//         res.sendStatus(400);
//     }
// });
//
// router.post('/auth/recover/request', async function (req, res, next) {
//     const users = container.get('users');
//     try{
//         await users.recover(_.get(req, 'body.email'));
//         res.send({});
//     }
//     catch (e){
//         res.sendStatus(400);
//     }
// });
//
//
// /**
//  * expects get params: email, token
//  */
// router.get('/auth/recover/reset', async function (req, res, next) {
//     const users = container.get('users');
//     const email = _.get(req, 'params.email');
//     const token = _.get(req, 'params.token');
//     //return reset password view
// });
//
// router.post('/auth/recover/reset', async function (req, res, next) {
//     const users = container.get('users');
//     const email = _.get(req, 'body.email');
//     const token = _.get(req, 'body.token');
//     const password = _.get(req, 'body.password');
//
//     try{
//         await users.changePassword(email, token, password);
//         res.send({});
//     }
//     catch(e){
//         res.sendStatus(400)
//     }
// });

module.exports = router;