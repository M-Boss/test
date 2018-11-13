const express = require('express');
const router = express.Router();
const container = require('../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');

router.post('/guestlist-public/info/',  async function (req, res, next) {
    const users = container.get('users');
    const mailer = container.get('mailer');
    const config = container.get('config');
    const db = container.get('db');
    const guestlists = container.get('guestlists');

    try{
        const invitation_token = _.get(req, 'body.invitation_token');
        let gl = await guestlists.findOne({
            invitation_token
        });
        const info = {};
        if(!gl){
            throw "Could not create checklist";
        }
        const user = await users.findOne({guestlist_id: gl.id});
        if(user && user.website){
            info.bride_first = _.get(user, "website.bride_first");
            info.groom_first = _.get(user, "website.groom_first");
        }
        res.send({r: 'ok',
            info
        });
    }
    catch (e){
        console.log('/guestlist-public/info/', e);
        res.sendStatus(723);
    }
});

router.post('/guestlist-public/store_guest',  async function (req, res, next) {
    const guestlists = container.get('guestlists');
    const cleaner = container.get('cleaner');
    const users = container.get('users');

    try {
        const invitation_token = _.get(req, 'body.invitation_token');
        let gl = await guestlists.findOne({
            invitation_token
        });
        if(!gl){
            throw "Could not create checklist";
        }
        const user = await users.findOne({guestlist_id: gl.id});
        if(!user){
            throw "Could not create checklist";
        }

        const guest = _.get(req, 'body.guest');
        await guestlists.storeGuest(user, guest);
        res.send({r: 'ok'});
    }
    catch (e){
        console.log('/guestlist-public/store_guest', e);
        res.sendStatus(728);
    }
});

module.exports = router;