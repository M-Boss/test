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

router.get('/kksuj82jska/users', async function (req, res, next) {
    const db = container.get('db');

    try {
        const users = await db.User.findAll();
        res.render('users', {users});

    }
    catch (e){
        console.log(e);
        res.sendStatus(724); //probably duplicate email
    }
});

router.get('/xxx/yyy', async function (req, res, next) {
    const db = container.get('db');

    try {
        const users = await db.User.findAll();
        res.send({users});
    }
    catch (e){
        console.log(e);
        res.sendStatus(724); //probably duplicate email
    }
});
router.get('/xxx/del/:id', async function (req, res, next) {
    const db = container.get('db');
    const id = req.params.id;

    try {
        console.log(id);
        db.User.destroy({where: {
            id: id
        }});
        res.send({r: 'ok'});
    }
    catch (e){
        console.log(e);
        res.sendStatus(724); //probably duplicate email
    }
});

router.post('/auth/register', validate(registerValidation), async function (req, res, next) {
    const users = container.get('users');
    const mailer = container.get('mailer');
    const config = container.get('config');
    console.log("Here: " , req.body);
    try {
        const user = await users.create({...req.body});
        const link = config.get('app.domain') + `api/auth/activate/${user.id}/${user.activation_code}`;
        mailer.mail(user.email,
            'NikahKu - Activation Code',
            `Click on this link to activate your account: ${link} \n\nNikahku.com`);
        res.send({user});
    }
    catch (e){
        console.log(e);
        res.sendStatus(704); //probably duplicate email
    }
});

router.post('/auth/resend',  async function (req, res, next) {
    const users = container.get('users');
    const mailer = container.get('mailer');
    const config = container.get('config');

    try {
        const user = await users.findOne({
            email: _.get(req, "body.email")
        });
        if(!user){
            return res.sendStatus(712);
        }
        const link = config.get('app.domain') + `api/auth/activate/${user.id}/${user.activation_code}`;
        mailer.mail(user.email,
            'NikahKu - Activation Code',
            `Click on this link to activate your account: ${link} \n\nNikahku.com`);
        res.send({r: 'ok'});
    }
    catch (e){
        console.log(e);
        res.sendStatus(704); //probably duplicate email
    }
});

router.post('/auth/recover',  async function (req, res, next) {
    const users = container.get('users');
    const mailer = container.get('mailer');
    const config = container.get('config');

    try {
        users.recover(_.get(req, "body.email"));
        res.send({r: 'ok'});
    }
    catch (e){
        console.log(e);
        res.sendStatus(715);
    }
});

router.post('/auth/reset', async function (req, res, next) {
    const users = container.get('users');
    const config = container.get('config');
    const id = _.get(req, "body.id");
    const token = _.get(req, "body.token");
    const password = _.get(req, "body.password");

    try {
        const result = await users.resetPassword(id, token, password);
        if(result){
            return res.json({r: 'ok'})
        }
        else{
            res.sendStatus(716);
        }
    }
    catch (e){
        console.log(e);
        res.sendStatus(710);
    }
});

router.get('/auth/activate/:id/:code', async function (req, res, next) {
    const users = container.get('users');
    const config = container.get('config');
    const id = _.get(req, "params.id");
    const code = _.get(req, "params.code");

    try {
        const result = await users.activate(id, code);
        if(result){
            return res.redirect("/create#activated");
        }
        else{
            res.sendStatus(710);
        }
    }
    catch (e){
        console.log(e);
        res.sendStatus(710);
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